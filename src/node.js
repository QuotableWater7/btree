'use strict';

module.exports = function (opts) {
  opts = opts || {};
  if (typeof opts.value === 'undefined') {
    throw new Error('Must provide value for node');
  }

  return {
    value: opts.value,
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
        return this.right.value > this.left.value ? this.right : this.left;
      }

      return this.right ? this.right : this.left;
    }
  };
}
