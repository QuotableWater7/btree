'use strict';

var Node = require('./node');
var spaces = require('./util/spaces');

module.exports = function (opts) {
  var opts = opts || {};

  return {
    key: opts.key || 'key',

    unique: opts.unique || false,

    print: function () {
      var self = this;

      var nodes = {};
      this.inOrderTraversal(function (node, sequence, depth) {
        node.sequence = sequence;
        node.depth = depth;

        if (!nodes[depth]) { nodes[depth] = []; }
        nodes[depth].push(node);
      });

      var spaces_per_node = 5;
      var node_depths = Object.keys(nodes);

      node_depths.forEach(function (depth) {
        var nodes_at_depth = nodes[depth];
        var output = '';
        for (var i = 0; i < nodes_at_depth.length; i++) {
          var node = nodes_at_depth[i];
          var prev_node = nodes_at_depth[i - 1];
          var prev_sequence = prev_node ? prev_node.sequence : 0;
          // console.log(node.sequence, i);
          var sequence_diff = node.sequence - prev_sequence;
          output += spaces(sequence_diff * spaces_per_node + (sequence_diff - 1));
          output += node[self.key];
        }
        console.log(output + '\n');
      });
    },

    printPaths: function () {
      var key = this.key;
      var paths = this.findPaths();

      paths.forEach(function (path) {
        var keys = path.map(function (node) { return node[key] });
        console.log(keys.join(' '));
      });
    },

    findPaths: function () {
      var result = [];
      this._findPaths(this.root, [], result);

      return result;
    },

    _findPaths: function (currentNode, currentPath, paths) {
      if (!currentNode) { return; }

      var newPath = currentPath.slice(0);
      newPath.push(currentNode);

      if (currentNode.isLeaf()) {
        paths.push(newPath);
      } else {
        this._findPaths(currentNode.left, newPath, paths);
        this._findPaths(currentNode.right, newPath, paths);
      }
    },

    isEmpty: function () {
      return this.height() === 0;
    },

    search: function (key) {
      return this._search(key, this.root);
    },

    next: function (node) {
      if (!node) { return null; }

      if (node.right) {
        return this.min(node.right);
      } else {
        var parent = node.parent;

        while (parent) {
          if (parent.left === node) {
            return parent;
          }
          node = parent;
          parent = parent.parent;
        }

        return null;
      }
    },

    prev: function (node) {
      if (!node) { return null; }

      if (node.left) {
        return this.max(node.left);
      } else {
        var parent = node.parent;

        while (parent) {
          if (parent.right === node) {
            return parent;
          }
          node = parent;
          parent = parent.parent;
        }

        return null;
      }
    },

    _search: function (key, currentNode) {
      if (!currentNode) {
        return null;
      } else if (currentNode[this.key] === key) {
        return currentNode;
      } else if (key < currentNode[this.key]) {
        return this._search(key, currentNode.left);
      } else if (key > currentNode[this.key]) {
        return this._search(key, currentNode.right);
      }
    },

    deleteAll: function () {
      this.root = null;
    },

    delete: function (key) {
      var node = typeof key === 'number' ? this.search(key) : key;
      if (!node) { throw new Error('Cannot delete non-existent node'); }

      this._delete(node);
    },

    _delete: function (node) {
      var parent = node.parent;

      if (node.isRoot()) { this.root = null; }

      // case 1: node is a leaf
      if (node.isLeaf()) {
        if (node.isRightChildOfParent(parent)) {
          parent.right = null;
        } else if (node.isLeftChildOfParent(parent)) {
          parent.left = null;
        }
        this.rebalance(parent);
      } // case 2: node with one child
      else if (node.hasOneChild()) {
        var child = node.left || node.right;

        if (node.isRightChildOfParent(parent)) {
          parent.right = child;
        } else if (node.isLeftChildOfParent(parent)) {
          parent.left = child;
        }

        child.parent = parent;
        this.rebalance(parent);
      } // case 3: node has two children
      else {
        var replacementNode = this.max(node.left);
        this.swap(node, replacementNode);
        this._delete(node);
      }
    },

    min: function (currentNode) {
      return this._min(currentNode || this.root);
    },

    _min: function (currentNode) {
      return currentNode.left ? this._min(currentNode.left) : currentNode;
    },

    max: function (currentNode) {
      return this._max(currentNode || this.root);
    },

    _max: function (currentNode) {
      return currentNode.right ? this._max(currentNode.right) : currentNode;
    },

    postOrderTraversal: function (callback, currentNode) {
      currentNode = arguments.length > 1 ? currentNode : this.root;

      if (currentNode.left) {
        this.postOrderTraversal(callback, currentNode.left);
      }

      if (currentNode.right) {
        this.postOrderTraversal(callback, currentNode.right);
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

      numbers.forEach(function (number) {
        this.insert(number);
      }.bind(this));
    },

    insert: function (node) {
      if (typeof node === 'number') {
        var data = {};
        data[this.key] = node;
        node = new Node(data);
      }

      if (!this.root) {
        this.root = node;
      } else {
        this._insert(node, this.root);
      }
    },

    _insert: function (node, currentRoot) {
      if (node[this.key] === currentRoot[this.key] && this.unique) {
        throw new Error('Duplicate key violation');
      } else if (node[this.key] > currentRoot[this.key]) {
        if (currentRoot.right) {
          this._insert(node, currentRoot.right);
        } else {
          currentRoot.setRightChild(node);
          this.rebalance(currentRoot.parent);
        }
      } else if (node[this.key] < currentRoot[this.key]) {
        if (currentRoot.left) {
          this._insert(node, currentRoot.left);
        } else {
          currentRoot.setLeftChild(node);
          this.rebalance(currentRoot.parent);
        }
      }
    },

    invert: function (node) {
      var node = arguments.length > 0 ? node : this.root;
      if (!node) { return; }
      if (this.height(node) === 1) { return; }

      this.invert(node.left);
      this.invert(node.right);

      var parent = node;
      var child = node.largestChild(this.key);
      this.swap(parent, child);

      if (child.isRoot()) { this.root = child; }
    },

    swap: function (n1, n2) {
      var n1parent = n1.parent;
      var n1left = n1.left;
      var n1right = n1.right;

      var n2parent = n2.parent;
      var n2left = n2.left;
      var n2right = n2.right;

      // connect nodes surrounding n1 and n2 to new nodes
      if (n1parent) {
        if (n1parent.right === n1) {
          n1parent.right = n2;
        } else {
          n1parent.left = n2;
        }
      }
      if (n1left) { n1left.parent = n2; }
      if (n1right) { n1right.parent = n2; }

      if (n2parent) {
        if (n2parent.right === n2) {
          n2parent.right = n1;
        } else {
          n2parent.left = n1;
        }
      }
      if (n2left) { n2left.parent = n1; }
      if (n2right) { n2right.parent = n1; }

      // now connect n1 and n2 to their correct surroundings
      n2.parent = n1parent !== n2 ? n1parent : n1;
      n2.right = n1right !== n2 ? n1right : n1;
      n2.left = n1left !== n2 ? n1left : n1;

      n1.parent = n2parent !== n1 ? n2parent : n2;
      n1.right = n2right !== n1 ? n2right : n2;
      n1.left = n2left !== n1 ? n2left : n2;

      if (n1.isRoot()) { this.root = n1; }
      else if (n2.isRoot()) { this.root = n2; }
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
      if (child_left_child) { child_left_child.parent = node; }

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
      if (child_right_child) { child_right_child.parent = node; }

      if (!parent) { this.root = child; }
    },

    height: function (node) {
      var node = arguments.length > 0 ? node : this.root;
      if (!node) { return 0; }

      return 1 + Math.max(this.height(node.left), this.height(node.right));
    }
  };
}
