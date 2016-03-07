'use strict';

module.exports.Tree = function (root) {
  this.root = root

  this.insert = function (node) {
    if (!this.root) {
      this.root = node;
    } else {
      this._insert(node, this.root);
    }
  },

  this._insert = function (node, currentRoot) {
    if (node.value >= currentRoot.value) {
      if (currentRoot.right) {
        this._insert(node, currentRoot.right);
      } else {
        currentRoot.setRightChild(node);
        this.rebalance(currentRoot.parent);
      }
    } else if (node.value < currentRoot.value) {
      if (currentRoot.left) {
        this._insert(node, currentRoot.left);
      } else {
        currentRoot.setLeftChild(node);
        this.rebalance(currentRoot.parent);
      }
    }

  };

  this.rebalance = function (node) {
    if (!node) { return; }
    var height_left = this.height(node.left);
    var height_right = this.height(node.right);
    debugger;

    var diff = height_left - height_right;
    if (diff === 2) {
      var child = node.left;
      if (this.height(child.right) > this.height(child.left)) {
        this.rotateLeft(child);
        this.rotateRight(child);
      } else {
        this.rotateRight(node);
      }
    } else if (diff === -2) {
      var child = node.right;
      if (this.height(child.left) > this.height(child.right)) {
        this.rotateRight(child);
        this.rotateLeft(child);
      } else {
        this.rotateLeft(node);
      }
    }

    this.rebalance(node.parent);
  };

  this.rotateLeft = function (node) {
    var parent = node.parent;
    var child = node.right;
    var child_left_child = child.left;

    child.parent = parent;
    if (parent) { parent.right = child; }
    child.left = node;

    node.parent = child;
    node.right = child_left_child;

    if (!parent) { this.root = child; }
  };

  this.rotateRight = function (node) {
    var parent = node.parent;
    var child = node.left;
    var child_right_child = child.right;

    child.parent = parent;
    if (parent) { parent.left = child; }
    child.right = node;

    node.parent = child;
    node.left = child_right_child;

    if (!parent) { this.root = child; }
  };

  this.height = function (node) {
    return arguments.length > 0 ? this._height(node) : this._height(this.root);
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

var Tree = module.exports.Tree;
var Node = module.exports.Node;

var tree = new Tree();
var node1 = new Node({ value: 10 });
var node2 = new Node({ value: 20 });
var node3 = new Node({ value: 30 });
tree.insert(node1);
tree.insert(node2);
tree.insert(node3);
