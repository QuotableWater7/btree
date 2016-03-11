'use strict';

var _ = require('underscore');
var Node = require('./node');

function spaces(number) {
  var spaces = '';
  for (var i = 0; i < number; i++) { spaces += ' '; }
  return spaces;
}

module.exports = function (root) {
  return {
    root: root,

    print: function () {
      this.updateNodePositionMetadata();
      var nodes = this.nodes();
      var nodes_by_depth = _.groupBy(nodes, 'depth');
      var total_spaces = 50;
      var spaces_per_node = total_spaces / nodes.length;

      _.each(nodes_by_depth, function (nodes_at_depth) {
        var output = '';
        for (var i = 0; i < nodes_at_depth.length; i++) {
          var node = nodes_at_depth[i];
          var prev_node = nodes_at_depth[i - 1];
          var prev_sequence = prev_node ? prev_node.sequence : 0;
          output += spaces((node.sequence - prev_sequence) * spaces_per_node - 1);
          output += node.value;
        }
        console.log(output + '\n');
      });
    },

    nodes: function () {
      var all_nodes = [];
      this.inOrderTraversal(function (node) { all_nodes.push(node); });
      return all_nodes;
    },

    postOrderTraversal: function (callback, currentNode) {
      currentNode = arguments.length > 1 ? currentNode : this.root;

      if (currentNode.left) {
        this.preOrderTraversal(callback, currentNode.left);
      }

      if (currentNode.right) {
        this.preOrderTraversal(callback, currentNode.right);
      }

      callback(currentNode);
    },

    preOrderTraversal: function (callback, currentNode) {
      currentNode = arguments.length > 1 ? currentNode : this.root;

      callback(currentNode);

      if (currentNode.left) {
        this.preOrderTraversal(callback, currentNode.left);
      }

      if (currentNode.right) {
        this.preOrderTraversal(callback, currentNode.right);
      }
    },

    updateNodePositionMetadata: function () {
      this.inOrderTraversal(function (node, sequence, depth) {
        node.sequence = sequence;
        node.depth = depth;
      });
    },

    inOrderTraversal: function (callback, currentNode, depth) {
      if (arguments.length === 1) {
        currentNode = this.root;
        this._sequence = 1;
        depth = 1;
      }

      if (currentNode.left) {
        this.inOrderTraversal(
          callback,
          currentNode.left,
          depth + 1
        );
      }

      callback(currentNode, this._sequence++, depth);

      if (currentNode.right) {
        this.inOrderTraversal(
          callback,
          currentNode.right,
          depth + 1
        );
      }
    },

    bulkInsert: function () {
      var numbers = Array.prototype.slice.call(arguments);
      var nodes = numbers.map(function (number) {
        return new Node({ value: number });
      });

      nodes.forEach(function (node) {
        this.insert(node);
      }.bind(this));
    },

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

    // make the max value be at root
    invert: function (node) {
      var node = arguments.length > 0 ? node : this.root;
      if (!node) { return; }
      if (this.height(node) === 1) { return; }

      this.invert(node.left);
      this.invert(node.right);

      var parent = node;
      var child = node.largestChild();
      this.swap(parent, child);

      if (child.isRoot()) { this.root = child; }
    },

    swap: function (parent, child) {
      var child_right = child.right;
      var child_left = child.left;
      var parent_parent = parent.parent;

      if (parent.right === child) {
        var parent_left = parent.left

        child.right = parent;
        child.left = parent_left;
      } else {
        var parent_right = parent.right;

        child.left = parent;
        child.right = parent_right;
      }

      if (parent_parent) {
        if (parent_parent.right === parent) {
          parent_parent.right = child;
        } else {
          parent_parent.left = child;
        }
      }

      parent.parent = child;
      parent.right = child_right;
      parent.left = child_left;
      child.parent = parent_parent;

      if (child.isRoot()) { this.root = child; }
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
      if (parent) {
        if (parent.right === node) {
          parent.right = child;
        } else if (parent.left === node) {
          parent.left = child;
        }
      }
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
      if (parent) {
        if (parent.right === node) {
          parent.right = child;
        } else if (parent.left === node) {
          parent.left = child;
        }
      }
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
