'use strict';

module.exports.Tree = function (root) {
  this.root = root

  this.insert = function (node, currentRoot) {
    currentRoot = currentRoot || this.root;

    if (!this.root) { this.root = node; }
    else if (node.value >= currentRoot.value) {
      if (!!currentRoot.right) {
        this.insert(node, currentRoot.right);
      } else {
        currentRoot.setRightChild(node);
      }
    } else if (node.value < currentRoot.value) {
      if (!!currentRoot.left) {
        this.insert(node, currentRoot.left);
      } else {
        currentRoot.setLeftChild(node);
      }
    }

    this.rebalance(node.parent);
  };

  this.rebalance = function (node) {
    if (!node) { return; }

    var left = node.left;
    var right = node.right;
    var height_left = this._height(left);
    var height_right = this._height(right);

    var diff = height_left - height_right;
    if (diff === 2) {
      if (this._height(left.right) > this._height(left.left)) {
        this.rotateLeft(left);
        this.rotateRight(left);
      } else {
        this.rotateRight(node);
      }
    } else if (diff === -2) {
      if (this._height(right.left) > this._height(right.right)) {
        this.rotateRight(right);
        // console.log('********');
        // console.log(this.root.right.value)
        this.rotateLeft(right);
      } else {
        this.rotateLeft(node);
      }
    }

    this.rebalance(node.parent);
  };

  this.rotateLeft = function (node) {
    // console.log('rotate left', node.value)
    var parent = node.parent;
    var child = node.right;
    // console.log(parent.value);
    // console.log(node.value);
    node.right = child.left;
    node.parent = child;
    child.parent = parent;
    child.left = node;
    if (parent) { parent.right = child; }
    if (!parent) { this.root = child; }
  };

  this.rotateRight = function (node) {
    var parent = node.parent;
    var child = node.left;
    // console.log('rotate right', node.value);
    // console.log('**** parent', parent.value, '**** child', child.value);

    node.left = child.right;
    node.parent = child;
    child.parent = parent;
    child.right = node;
    if (parent) { parent.left = child; }
    if (!parent) { this.root = child; }
  };

  this.height = function () {
    return this._height(this.root);
  };

  this._height = function (currentRoot) {
    if (!currentRoot) { return 0; }

    return 1 + Math.max(this._height(currentRoot.left), this._height(currentRoot.right));
  };
}

module.exports.Node = function (opts) {
  opts = opts || {};
  if (!opts.value) { throw new Error('Must provide value for node'); }

  this.value = opts.value;
  this.left = opts.left;
  this.right = opts.right;
  this.parent = opts.parent;

  this.setRightChild = function (node) {
    this.right = node;
    node.parent = this;
  };

  this.setLeftChild = function (node) {
    this.left = node;
    node.parent = this;
  };
}
