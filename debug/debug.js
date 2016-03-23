'use strict';

var BTree = require('../src/index');
var Tree = BTree.Tree;
var Node = BTree.Node;

var tree = new Tree();
tree.bulkInsert(1, 2, 3, 4, 5, 6, 7, 8, 9);
tree.print();
// tree.deleteAll();
tree.printPaths();
// debugger;
