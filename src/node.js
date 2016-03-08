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

    setRightChild: function (node) {
      this.right = node;
      node.parent = this;
    },

    setLeftChild: function (node) {
      this.left = node;
      node.parent = this;
    }
  };
}
