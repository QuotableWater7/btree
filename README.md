# btree
A rebalancing binary tree for JS

This is a self-rebalancing binary tree. To install / use:
```
npm install btree-js

// in JS
var BinaryTree = require('btree-js');
var Tree = BinaryTree.Tree;
var Node = BinaryTree.Node;

var tree = new Tree();
var node = new Node({ value: 10 });
tree.insert(node);  // node is now the tree's root
tree.insert(new Node({ value: 15 }));  // tree.root.right.value: 15
```
