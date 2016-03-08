'use strict';

var chai = require('chai');
var expect = chai.expect;
var BinaryTree = require('../src/index');
var Node = BinaryTree.Node;

describe('#constructor', function () {

  it('sets the attributes on the object', function () {
    var node = new Node({ value: 5, parent: 'blah', left: 'left', right: 'right' });

    expect(node.value).to.eq(5);
    expect(node.parent).to.eq('blah');
    expect(node.left).to.eq('left');
    expect(node.right).to.eq('right');
  });

});

describe('#setLeftChild', function () {

  it('updates the left child', function () {
    var node = new Node({ value: 5 });
    var left = new Node({ value: 10 });

    node.setLeftChild(left);
    expect(node.left).to.eq(left);
  });

  it('updates the left child\'s parent', function () {
    var node = new Node({ value: 5 });
    var left = new Node({ value: 10 });

    node.setLeftChild(left);
    expect(node.left.parent).to.eq(node);
  });

});

describe('#setRightChild', function () {

  it('updates the right child', function () {
    var node = new Node({ value: 5 });
    var right = new Node({ value: 10 });

    node.setRightChild(right);
    expect(node.right).to.eq(right);
  });

  it('updates the right child\'s parent', function () {
    var node = new Node({ value: 5 });
    var right = new Node({ value: 10 });

    node.setRightChild(right);
    expect(node.right.parent).to.eq(node);
  });

});
