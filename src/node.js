'use strict';

module.exports = function (opts) {
  opts = opts || {};
  if (typeof opts.key === 'undefined') {
    throw new Error('Must provide value for node');
  }

  return {
    key: opts.key,
    left: opts.left,
    right: opts.right,
    parent: opts.parent,
    seq: null,
    depth: null,

    setRightChild: function (node) {
      this.right = node;
      node.parent = this;
    },

    setLeftChild: function (node) {
      this.left = node;
      node.parent = this;
    },

    isRoot: function () {
      return !this.parent;
    },

    largestChild: function () {
      if (this.right && this.left) {
        return this.right.key > this.left.key ? this.right : this.left;
      }

      return typeof this.right !== 'undefined' ? this.right : this.left;
    }
  };
}
