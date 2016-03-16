'use strict';

var chai = require('chai');
var expect = chai.expect;
var BinaryTree = require('../src/index');
var Node = BinaryTree.Node;

describe('#constructor', function () {

  it('sets the attributes on the object', function () {
    var node = new Node({ key: 5, parent: 'blah', left: 'left', right: 'right' });

    expect(node.key).to.eq(5);
    expect(node.parent).to.eq('blah');
    expect(node.left).to.eq('left');
    expect(node.right).to.eq('right');
  });

});

describe('#setLeftChild', function () {

  it('updates the left child', function () {
    var node = new Node({ key: 5 });
    var left = new Node({ key: 10 });

    node.setLeftChild(left);
    expect(node.left).to.eq(left);
  });

  it('updates the left child\'s parent', function () {
    var node = new Node({ key: 5 });
    var left = new Node({ key: 10 });

    node.setLeftChild(left);
    expect(node.left.parent).to.eq(node);
  });

});

describe('#setRightChild', function () {

  it('updates the right child', function () {
    var node = new Node({ key: 5 });
    var right = new Node({ key: 10 });

    node.setRightChild(right);
    expect(node.right).to.eq(right);
  });

  it('updates the right child\'s parent', function () {
    var node = new Node({ key: 5 });
    var right = new Node({ key: 10 });

    node.setRightChild(right);
    expect(node.right.parent).to.eq(node);
  });

});

describe('#largestChild', function () {
  var left;
  var right;
  var root;

  beforeEach(function () {
    left = new Node({ id: 50, key: 100 });
    right = new Node({ id: 100, key: 50 });
    root = new Node({ id: 10, left: left, right: right });
  });

  it('returns largest child when both are present', function () {
    expect(root.largestChild()).to.eq(root.right);

    root.left = right;
    root.right = left;

    expect(root.largestChild()).to.eq(root.left);
  });

  it('returns left child if it is present and right child is not', function () {
    delete root.right;

    expect(root.largestChild()).to.eq(root.left);
  });

  it('returns right child if it is present and left child is not', function () {
    delete root.left;

    expect(root.largestChild()).to.eq(root.right);
  });

  it('uses key passed in when present', function () {
    expect(root.largestChild('key')).to.eq(root.left);
  });
});
