'use strict';

module.exports = function (root) {
  return {
    root: root,

    insert: function (node, currentRoot) {
      var currentRoot = arguments.length > 1 ? currentRoot : this.root;

      if (!this.root) {
        this.root = node;
      } else if (node.value >= currentRoot.value) {
        if (currentRoot.right) {
          this.insert(node, currentRoot.right);
        } else {
          currentRoot.setRightChild(node);
          this.rebalance(currentRoot.parent);
        }
      } else if (node.value < currentRoot.value) {
        if (currentRoot.left) {
          this.insert(node, currentRoot.left);
        } else {
          currentRoot.setLeftChild(node);
          this.rebalance(currentRoot.parent);
        }
      }
    },

    rebalance: function (node) {
      if (!node) { return; }
      var height_left = this.height(node.left);
      var height_right = this.height(node.right);

      var diff = height_left - height_right;
      if (diff === 2) {
        var child = node.left;

        if (this.height(child.right) > this.height(child.left)) {
          this.rotateLeft(child);
          node.left = child.parent;
        }

        this.rotateRight(node);
      } else if (diff === -2) {
        var child = node.right;

        if (this.height(child.left) > this.height(child.right)) {
          this.rotateRight(child);
          node.right = child.parent;
        }

        this.rotateLeft(node);
      }

      this.rebalance(node.parent);
    },

    rotateLeft: function (node) {
      var parent = node.parent;
      var child = node.right;
      var child_left_child = child.left;

      child.parent = parent;
      if (parent) { parent.left = child; }
      child.left = node;

      node.parent = child;
      node.right = child_left_child;

      if (!parent) { this.root = child; }
    },

    rotateRight: function (node) {
      var parent = node.parent;
      var child = node.left;
      var child_right_child = child.right;

      child.parent = parent;
      if (parent) { parent.right = child; }
      child.right = node;

      node.parent = child;
      node.left = child_right_child;

      if (!parent) { this.root = child; }
    },

    height: function (node) {
      var node = arguments.length > 0 ? node : this.root;
      if (!node) { return 0; }

      return 1 + Math.max(this.height(node.left), this.height(node.right));
    }
  };
}
