'use strict';

var Tree = require('../src/tree');

var tree = new Tree();
tree.bulkInsert(
  1, 3, 5, 2, 4, 6, 7, 8, 9, 15, 11, 13, 17, 18, 14, 19, 25, 30, 22, 21, 10, 16
);
tree.print();
