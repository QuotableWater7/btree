'use strict';

var Tree = require('../src/tree');

var tree = new Tree();
tree.bulkInsert(1,3,5,2,4,6,7, 8);
tree.print();

console.log('\n\n');

tree.bulkInsert(9, 15, 11, 13, 17, 18, 14, 19);
tree.print();
