'use strict'

var _ = require('underscore')

module.exports = function(opts) {
  opts = opts || {}

  return {
    data: opts,
    left: opts.left,
    right: opts.right,
    parent: opts.parent,
    seq: null,
    depth: null,

    setRightChild: function(node) {
      this.right = node
      node.parent = this
    },

    setLeftChild: function(node) {
      this.left = node
      node.parent = this
    },

    isRoot: function() {
      return !this.parent
    },

    isLeaf: function() {
      return !this.left && !this.right
    },

    hasOneChild: function() {
      return (this.right && !this.left) || (this.left && !this.right)
    },

    isRightChildOfParent: function(parent) {
      return parent && parent.right === this
    },

    isLeftChildOfParent: function(parent) {
      return parent && parent.left === this
    },

    largestChild: function(key) {
      if (this.right && this.left) {
        return this.right.data[key] > this.left.data[key]
          ? this.right
          : this.left
      }

      return typeof this.right !== 'undefined' ? this.right : this.left
    }
  }
}
