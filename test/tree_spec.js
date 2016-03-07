'use strict';

var chai = require('chai');
var expect = chai.expect;
var BinaryTree = require('../index');
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
  });

});
