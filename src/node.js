'use strict';

var _ = require('underscore');

module.exports = function (opts) {
  opts = opts || {};

  return _.extend({
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

    isLeaf: function () {
      return !this.left && !this.right;
    },

    hasOneChild: function () {
      return (this.right && !this.left) || (this.left && !this.right);
    },

    isRightChildOfParent: function (parent) {
      return parent && parent.right === this;
    },

    isLeftChildOfParent: function (parent) {
      return parent && parent.left === this;
    },

    largestChild: function (key) {
      var key = key || 'id';
      if (this.right && this.left) {
        return this.right[key] > this.left[key] ? this.right : this.left;
      }

      return typeof this.right !== 'undefined' ? this.right : this.left;
    }
  }, opts);
}
