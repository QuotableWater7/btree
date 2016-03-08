'use strict';

var chai = require('chai');
var expect = chai.expect;
var BinaryTree = require('../src/index');
var Tree = BinaryTree.Tree;
var Node = BinaryTree.Node;

describe('#height', function () {
  it('returns 0 when there is no root', function () {
    expect(new Tree().height()).to.eq(0);
  });

  it('returns 1 when there is only a root', function () {
    var root = new Node({ value: 10 });
    var tree = new Tree(root);

    expect(tree.height()).to.eq(1);
  });

  it('returns 2 when there is a second level of tree', function () {
    var root = new Node({ value: 10 });
    var leaf = new Node({ value: 15 });
    var leaf2 = new Node({ value: 8 });
    var tree = new Tree(root);
    tree.insert(leaf);
    tree.insert(leaf2);

    expect(tree.height()).to.eq(2);
  });

  it('returns height of subtree when subtree passed in', function () {
    var root = new Node({ value: 10 });
    var leaf = new Node({ value: 15 });
    var leaf2 = new Node({ value: 8 });
    var tree = new Tree(root);
    tree.insert(leaf);
    tree.insert(leaf2);

    expect(tree.height(leaf)).to.eq(1);
  });
});

describe('bulk insert', function () {
  it('turns an array of numbers into a tree with nodes', function () {
    var tree = new Tree();
    tree.bulkInsert(10, 5, 15, 3, 6, 12, 18, 21);

    expect(tree.root.value).to.eq(10);
    expect(tree.root.left.value).to.eq(5);
    expect(tree.root.left.left.value).to.eq(3);
    expect(tree.root.left.right.value).to.eq(6);
    expect(tree.root.right.value).to.eq(15);
    expect(tree.root.right.left.value).to.eq(12);
    expect(tree.root.right.right.value).to.eq(18);
    expect(tree.root.right.right.right.value).to.eq(21);
  });
});

describe('#insert', function () {
  it('inserts to root when there is no root', function () {
    var tree = new BinaryTree.Tree();
    var node = new BinaryTree.Node({ value: 10 });

    tree.insert(node);

    expect(tree.root).to.eq(node);
  });

  it('inserts to correct subtree when root present', function () {
    var tree = new Tree();
    var node1 = new Node({ value: 10 });
    tree.insert(node1);

    var node2 = new Node({ value: 20 });
    tree.insert(node2);

    expect(tree.root.right).to.eq(node2);

    var node3 = new Node({ value: 5 });
    tree.insert(node3);

    expect(tree.root.left).to.eq(node3);
  });

  it('rebalances tree to left when right side gets too long', function () {
    var tree = new Tree();
    var node1 = new Node({ value: 10 });
    var node2 = new Node({ value: 20 });
    var node3 = new Node({ value: 30 });
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
    var node1 = new Node({ value: 10 });
    var node2 = new Node({ value: 20 });
    var node3 = new Node({ value: 15 });
    tree.insert(node1);
    tree.insert(node2);
    tree.insert(node3);

    expect(tree.root).to.eq(node3);
    expect(tree.root.left).to.eq(node1);
    expect(tree.root.right).to.eq(node2);
    expect(tree.height()).to.eq(2);
  });

  it('rebalances tree to right when left side gets too long', function () {
    var tree = new Tree();
    var node1 = new Node({ value: 30 });
    var node2 = new Node({ value: 20 });
    var node3 = new Node({ value: 10 });
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
    var node1 = new Node({ value: 30 });
    var node2 = new Node({ value: 10 });
    var node3 = new Node({ value: 20 });
    tree.insert(node1);
    tree.insert(node2);
    tree.insert(node3);

    expect(tree.root).to.eq(node3);
    expect(tree.root.right).to.eq(node1);
    expect(tree.root.left).to.eq(node2);
    expect(tree.height()).to.eq(2);
  });

});

describe.only('#swap', function () {
  var tree;
  var root;

  beforeEach(function () {
    tree = new Tree();
    tree.bulkInsert(50, 25, 75);
    root = tree.root;
  });

  it('swaps the two elements when child is the left child', function () {
    tree.swap(root, root.left);

    expect(tree.root.value).to.eq(25);
    expect(tree.root.left.value).to.eq(50);
    expect(tree.root.right.value).to.eq(75);
  });

  it('swaps the two elements when child is the right child', function () {
    tree.swap(root, root.right);

    expect(tree.root.value).to.eq(75);
    expect(tree.root.left.value).to.eq(25);
    expect(tree.root.right.value).to.eq(50);
  });

  it('correctly updates the parents on the swapped elements', function () {
    tree.swap(tree.root, tree.root.right);
    expect(tree.root.right.parent).to.eq(tree.root);

    tree.swap(tree.root, tree.root.left);
    expect(tree.root.left.parent).to.eq(tree.root);
  });

  it.only('can swap at more than 1 level deep', function () {
    tree.bulkInsert(60, 80);

    // tree.swap(root.right, root.right.left);
    // expect(tree.root.right.value).to.eq(60);

    tree.swap(tree.root.right, tree.root.right.right);
    expect(tree.root.right.value).to.eq(80);
  });
});

describe('#invert', function () {
  it('puts the max value at the root', function () {
    var tree = new Tree();
    tree.bulkInsert(20, 25);
    tree.invert();

    expect(tree.root.value).to.eq(25);
  });

  it('inverts all the subtrees', function () {
    var tree = new Tree();
    tree.bulkInsert(20, 25, 15);
    tree.invert();

    expect(tree.root.value).to.eq(25);
    expect(tree.root.left.value).to.eq(20);
    expect(tree.root.right.value).to.eq(15);
  });
});
