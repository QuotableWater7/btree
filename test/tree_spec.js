'use strict';

var chai = require('chai');
var expect = chai.expect;
var BinaryTree = require('../src/index');
var Tree = BinaryTree.Tree;
var Node = BinaryTree.Node;

describe('constructor', function () {
  it('can index based on the key passed in', function () {
    var tree = new Tree({ key: 'value' });
    var root = new Node({ key: 30, value: 50 });
    var leaf = new Node({ key: 50, value: 30 });

    tree.insert(root);
    tree.insert(leaf);

    expect(tree.search(root.value)).to.eq(root);
    expect(tree.search(leaf.value)).to.eq(leaf);
  });
});

describe('#isEmpty', function () {
  it('returns true when no nodes have been inserted', function () {
    var tree = new Tree();
    expect(tree.isEmpty()).to.eq(true);
  });

  it('returns false when nodes have been inserted', function () {
    var tree = new Tree();
    tree.insert(new Node({ key: 10, value: 'plop' }));

    expect(tree.isEmpty()).to.eq(false);

    tree.delete(10);
    expect(tree.isEmpty()).to.eq(true);
  });
});

describe('#findPaths', function () {
  it('returns all the paths from root to leaf', function () {
    var tree = new Tree();
    tree.bulkInsert(1, 2, 3, 4, 5, 6, 7, 8, 9);

    var paths = tree.findPaths();
    expect(paths.length).to.eq(5);

    var expected_paths = [
      [4, 2, 1],
      [4, 2, 3],
      [4, 6, 5],
      [4, 6, 8, 7],
      [4, 6, 8, 9]
    ];

    var path_index = 0;
    paths.forEach(function (path) {
      var node_index = 0;
      path.forEach(function (node) {
        expect(expected_paths[path_index][node_index++]).to.eq(node.key);
      });

      path_index++;
    });
  });
});

describe('#next', function () {
  it('returns the next node in the tree', function () {
    var tree = new Tree();
    tree.bulkInsert(6, 7, 8, 1, 2, 3, 4, 5);

    for (var i = 1; i < 8; i++) {
      expect(tree.next(tree.search(i))).to.eq(tree.search(i + 1));
    }
  });

  it('returns null if no node passed in', function () {
    var tree = new Tree();

    expect(tree.next(null)).to.eq(null);
  });

  it('returns null if no next element', function () {
    var tree = new Tree();
    tree.insert(5);

    expect(tree.next(tree.search(5))).to.eq(null);
  });
});

describe('#prev', function () {
  it('returns the prev node in the tree', function () {
    var tree = new Tree();
    tree.bulkInsert(6, 7, 8, 1, 2, 3, 4, 5);

    for (var i = 2; i <= 8; i++) {
      expect(tree.prev(tree.search(i))).to.eq(tree.search(i - 1));
    }
  });

  it('returns null if no node passed in', function () {
    var tree = new Tree();

    expect(tree.prev(null)).to.eq(null);
  });

  it('returns null if no prev element', function () {
    var tree = new Tree();
    tree.insert(5);

    expect(tree.prev(tree.search(5))).to.eq(null);
  });
});

describe('#delete', function () {
  var tree;

  beforeEach(function () {
    tree = new Tree();
    tree.bulkInsert(100, 50, 150, 175, 125);
  });

  it('can delete the root', function () {
    tree.delete(tree.root.key);

    expect(tree.root.key).to.eq(150);
  });

  it('can delete the root when many elements in tree', function () {
    tree = new Tree();
    tree.bulkInsert(
      1, 3, 5, 2, 4, 6, 7, 8, 9, 15, 11, 13, 17, 18, 14, 19, 25, 30, 22, 21, 10, 16
    );
    tree.delete(tree.root);
    tree.delete(tree.root);
    tree.delete(tree.root);

    expect(tree.root.key).to.eq(9);
  });

  it('can delete when node has one child on left', function () {
    tree = new Tree();
    tree.bulkInsert(50, 25, 75, 12);
    tree.delete(25);

    expect(tree.root.left.key).to.eq(12);
    expect(tree.root.left.parent).to.eq(tree.root);
  });

  it('can delete when node has one child on right', function () {
    tree = new Tree();
    tree.bulkInsert(50, 25, 75, 33);
    tree.delete(25);

    expect(tree.root.left.key).to.eq(33);
    expect(tree.root.left.parent).to.eq(tree.root);
  });

  it('can delete when node has two children', function () {
    tree.delete(150);

    expect(tree.root.right.key).to.eq(125);
    expect(tree.root.right.parent).to.eq(tree.root);
    expect(tree.root.right.right.key).to.eq(175);
    expect(tree.root.right.right.parent).to.eq(tree.root.right);
  });

  it('can delete when node is a leaf', function () {
    tree.delete(tree.root.left.key);
    // rebalancing results in 100 on left
    expect(tree.root.left.key).to.eq(100);
  });

  it('throws error if node not found', function () {
    function runner() { tree.delete(99); }

    expect(runner).to.throw('Cannot delete non-existent node');
  });
});

describe('#deleteAll', function () {
  var tree;

  beforeEach(function () {
    tree = new Tree();
    tree.bulkInsert(1, 2, 3, 4, 5, 6, 7, 8, 9);
  });

  it('removes all nodes including the root', function () {
    tree.deleteAll();

    expect(tree.height()).to.eq(0);
    expect(tree.isEmpty()).to.eq(true);
  });
});

describe('#min', function () {
  it('returns the root when it is the only element', function () {
    var tree = new Tree();
    tree.bulkInsert(9);

    expect(tree.min().key).to.eq(9);
  });

  it('returns node with smallest key when tree has multiple levels', function () {
    var tree = new Tree();
    tree.bulkInsert(9, 10, 3, 5, 0, 4, 2, 7);

    expect(tree.min().key).to.eq(0);
  });
});

describe('#max', function () {
  it('returns the root when it is the only element', function () {
    var tree = new Tree();
    tree.bulkInsert(9);

    expect(tree.max().key).to.eq(9);
  });

  it('returns node with smallest key when tree has multiple levels', function () {
    var tree = new Tree();
    tree.bulkInsert(9, 10, 3, 5, 0, 4, 2, 7);

    expect(tree.max().key).to.eq(10);
  });
});

describe('#height', function () {
  it('returns 0 when there is no root', function () {
    expect(new Tree().height()).to.eq(0);
  });

  it('returns 1 when there is only a root', function () {
    var root = new Node({ key: 10 });
    var tree = new Tree();
    tree.insert(root);

    expect(tree.height()).to.eq(1);
  });

  it('returns 2 when there is a second level of tree', function () {
    var root = new Node({ key: 10 });
    var leaf = new Node({ key: 15 });
    var leaf2 = new Node({ key: 8 });
    var tree = new Tree();
    tree.insert(root);
    tree.insert(leaf);
    tree.insert(leaf2);

    expect(tree.height()).to.eq(2);
  });

  it('returns height of subtree when subtree passed in', function () {
    var root = new Node({ key: 10 });
    var leaf = new Node({ key: 15 });
    var leaf2 = new Node({ key: 8 });
    var tree = new Tree();
    tree.insert(root);
    tree.insert(leaf);
    tree.insert(leaf2);

    expect(tree.height(leaf)).to.eq(1);
  });
});

describe('#search', function () {
  var tree;

  beforeEach(function () {
    tree = new Tree();
  });

  it('can return the matching node from left tree', function () {
    tree.bulkInsert(5, 3, 6, 4);

    expect(tree.search(4).key).to.eq(4);
  });

  it('can return the matching node from right tree', function () {
    tree.bulkInsert(5, 3, 6, 4);

    expect(tree.search(6).key).to.eq(6);
  });

  it('can return the matching node from root', function () {
    tree.bulkInsert(5);

    expect(tree.search(5).key).to.eq(5);
  });

  it('returns null when the node is not found', function () {
    tree.bulkInsert(5, 3, 6, 4);

    expect(tree.search(8)).to.eq(null);
  });
});

describe('bulk insert', function () {
  it('turns an array of numbers into a tree with nodes', function () {
    var tree = new Tree();
    tree.bulkInsert(10, 5, 15, 3, 6, 12, 18, 21);

    expect(tree.root.key).to.eq(10);
    expect(tree.root.left.key).to.eq(5);
    expect(tree.root.left.left.key).to.eq(3);
    expect(tree.root.left.right.key).to.eq(6);
    expect(tree.root.right.key).to.eq(15);
    expect(tree.root.right.left.key).to.eq(12);
    expect(tree.root.right.right.key).to.eq(18);
    expect(tree.root.right.right.right.key).to.eq(21);
  });
});

describe('#insert', function () {
  it('can accept a number', function () {
    var tree = new Tree();
    tree.insert(5);

    expect(tree.root.key).to.eq(5);
  });

  it('can accept a number when there is custom key', function () {
    var tree = new Tree({ key: 'index' });
    tree.insert(5);

    expect(tree.root.index).to.eq(5);
  });

  it('inserts to root when there is no root', function () {
    var tree = new Tree();
    var node = new Node({ key: 10 });

    tree.insert(node);

    expect(tree.root).to.eq(node);
  });

  it('throws error when key present and unique: true', function () {
    var tree = new Tree({ unique: true });
    tree.bulkInsert(4, 5, 6);

    expect(function () { tree.bulkInsert(5); }).to.throw('Duplicate key violation');
  });

  it('does not throw error when key present and unique: false', function () {
    var tree = new Tree();
    tree.bulkInsert(4, 5, 6);

    expect(function () { tree.bulkInsert(5); }).not.to.throw();
  });

  it('inserts to correct subtree when root present', function () {
    var tree = new Tree();
    var node1 = new Node({ key: 10 });
    tree.insert(node1);

    var node2 = new Node({ key: 20 });
    tree.insert(node2);

    expect(tree.root.right).to.eq(node2);

    var node3 = new Node({ key: 5 });
    tree.insert(node3);

    expect(tree.root.left).to.eq(node3);
  });

  it('sets the correct parent on the inserted node', function () {
    var tree = new Tree();
    tree.bulkInsert(10, 5, 15, 2, 8);

    expect(tree.search(2).parent).to.eq(tree.search(5));
  });

  it('rebalances tree to left when right side gets too long', function () {
    var tree = new Tree();
    var node1 = new Node({ key: 10 });
    var node2 = new Node({ key: 20 });
    var node3 = new Node({ key: 30 });
    tree.insert(node1);
    tree.insert(node2);
    tree.insert(node3);

    expect(tree.root).to.eq(node2);
    expect(tree.root.left).to.eq(node1);
    expect(tree.root.right).to.eq(node3);
    expect(tree.height()).to.eq(2);
  });

  it('rebalances tree to left when right side gets too long, case 2', function () {
    var tree = new Tree();
    var node1 = new Node({ key: 10 });
    var node2 = new Node({ key: 20 });
    var node3 = new Node({ key: 15 });
    tree.insert(node1);
    tree.insert(node2);
    tree.insert(node3);

    expect(tree.root).to.eq(node3);
    expect(tree.root.left).to.eq(node1);
    expect(tree.root.right).to.eq(node2);
    expect(tree.height()).to.eq(2);
  });

  it('rebalances tree to left when right side gets too long, case 3', function () {
    var tree = new Tree();
    tree.bulkInsert(1, 2, 3, 4, 5, 6);

    expect(tree.root.key).to.eq(4);
    expect(tree.root.left.key).to.eq(2);
    expect(tree.root.left.parent).to.eq(tree.root);
    expect(tree.root.left.left.key).to.eq(1);
    expect(tree.root.left.left.parent).to.eq(tree.root.left);
    expect(tree.root.left.right.key).to.eq(3);
    expect(tree.root.left.right.parent).to.eq(tree.root.left);
    expect(tree.root.right.key).to.eq(5);
    expect(tree.root.right.parent).to.eq(tree.root);
    expect(tree.root.right.right.key).to.eq(6);
    expect(tree.root.right.right.parent).to.eq(tree.root.right);
  });

  it('rebalances tree to right when left side gets too long', function () {
    var tree = new Tree();
    var node1 = new Node({ key: 30 });
    var node2 = new Node({ key: 20 });
    var node3 = new Node({ key: 10 });
    tree.insert(node1);
    tree.insert(node2);
    tree.insert(node3);

    expect(tree.root).to.eq(node2);
    expect(tree.root.right).to.eq(node1);
    expect(tree.root.left).to.eq(node3);
    expect(tree.height()).to.eq(2);
  });

  it('rebalances tree to right when left side gets too long, case 2', function () {
    var tree = new Tree();
    var node1 = new Node({ key: 30 });
    var node2 = new Node({ key: 10 });
    var node3 = new Node({ key: 20 });
    tree.insert(node1);
    tree.insert(node2);
    tree.insert(node3);

    expect(tree.root).to.eq(node3);
    expect(tree.root.right).to.eq(node1);
    expect(tree.root.left).to.eq(node2);
    expect(tree.height()).to.eq(2);
  });

  it('rebalances tree to right when left side gets too long, case 3', function () {
    var tree = new Tree();
    tree.bulkInsert(6, 5, 4, 3, 2, 1);

    expect(tree.root.key).to.eq(3);
    expect(tree.root.left.key).to.eq(2);
    expect(tree.root.left.parent).to.eq(tree.root);
    expect(tree.root.left.left.key).to.eq(1);
    expect(tree.root.left.left.parent).to.eq(tree.root.left);
    expect(tree.root.right.key).to.eq(5);
    expect(tree.root.right.parent).to.eq(tree.root);
    expect(tree.root.right.left.key).to.eq(4);
    expect(tree.root.right.left.parent).to.eq(tree.root.right);
    expect(tree.root.right.right.key).to.eq(6);
    expect(tree.root.right.right.parent).to.eq(tree.root.right);
  });

});

describe('#swap', function () {
  var tree;
  var root;

  beforeEach(function () {
    tree = new Tree();
    tree.bulkInsert(50, 25, 75);
    root = tree.root;
  });

  it('swaps the two elements when child is the left child', function () {
    tree.swap(root, root.left);

    expect(tree.root.key).to.eq(25);
    expect(tree.root.left.key).to.eq(50);
    expect(tree.root.right.key).to.eq(75);
  });

  it('swaps the two elements when child is the right child', function () {
    tree.swap(root, root.right);

    expect(tree.root.key).to.eq(75);
    expect(tree.root.left.key).to.eq(25);
    expect(tree.root.right.key).to.eq(50);
  });

  it('swaps two elements when first is child and second is parent', function () {
    tree.swap(root.right, root);

    expect(tree.root.key).to.eq(75);
    expect(tree.root.left.key).to.eq(25);
    expect(tree.root.right.key).to.eq(50);
  });

  it('correctly updates the parents on the swapped elements', function () {
    tree.swap(tree.root, tree.root.right);
    expect(tree.root.right.parent).to.eq(tree.root);

    tree.swap(tree.root, tree.root.left);
    expect(tree.root.left.parent).to.eq(tree.root);
  });

  it('can swap at more than 1 level deep', function () {
    tree.bulkInsert(60, 80);

    tree.swap(root.right, root.right.left);
    expect(tree.root.right.key).to.eq(60);

    tree.swap(tree.root.right, tree.root.right.right);
    expect(tree.root.right.key).to.eq(80);

    tree.swap(tree.root, tree.root.right);
    expect(tree.root.key).to.eq(80);
    expect(tree.root.right.key).to.eq(50);
    expect(tree.root.right.parent).to.eq(tree.root);
    expect(tree.root.left.parent).to.eq(tree.root);

    tree.swap(tree.root.left, tree.root);
    expect(tree.root.key).to.eq(25);
    expect(tree.root.left.key).to.eq(80);
    expect(tree.root.left.parent).to.eq(tree.root);
    expect(tree.root.right.parent).to.eq(tree.root);
  });

  it('can swap any two nodes (not just parent/child)', function () {
    tree.bulkInsert(12,  33);
    // swap siblings
    tree.swap(tree.root.left.left, tree.root.left.right);

    expect(tree.root.left.left.key).to.eq(33);
    expect(tree.root.left.left.parent.key).to.eq(25);
    expect(tree.root.left.right.key).to.eq(12);
    expect(tree.root.left.right.parent.key).to.eq(25);
  });
});

describe('#invert', function () {
  it('puts the max value at the root', function () {
    var tree = new Tree();
    tree.bulkInsert(20, 25);
    tree.invert();

    expect(tree.root.key).to.eq(25);
  });

  it('inverts all the subtrees', function () {
    var tree = new Tree();
    tree.bulkInsert(20, 25, 15, 22, 28);
    expect(tree.root.key).to.eq(20);
    expect(tree.root.left.key).to.eq(15);
    expect(tree.root.right.key).to.eq(25);

    tree.invert();

    expect(tree.root.key).to.eq(28);
    expect(tree.root.left.key).to.eq(15);
    expect(tree.root.right.key).to.eq(20);
    expect(tree.root.right.left.key).to.eq(22);
    expect(tree.root.right.right.key).to.eq(25);
  });
});

describe('#inOrderTraversal', function () {
  it('yields the tree nodes in order, with metadata', function () {
    var tree = new Tree();
    tree.bulkInsert(50, 25, 75, 12, 80, 30);
    var node_order = [
      { node: tree.root.left.left, depth: 3 },
      { node: tree.root.left, depth: 2 },
      { node: tree.root.left.right, depth: 3 },
      { node: tree.root, depth: 1 },
      { node: tree.root.right, depth: 2 },
      { node: tree.root.right.right, depth: 3 }
    ];

    tree.inOrderTraversal(function (node, sequence, depth) {
      var node_order_entry = node_order[sequence - 1];

      expect(node).to.eq(node_order_entry.node);
      expect(depth).to.eq(node_order_entry.depth);
    });
  });
});
