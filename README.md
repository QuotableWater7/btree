# btree
A rebalancing binary tree for JS

To install / use:
```javascript
npm install btree-js
```

```javascript
var BinaryTree = require('btree-js');
var Tree = BinaryTree.Tree;
var Node = BinaryTree.Node;

var tree = new Tree();
var node = new Node({ value: 10 });
tree.insert(node);                     // node is now tree's root
tree.insert(new Node({ value: 15 }));  // tree.root.right.value: 15
```

To print a text-view of the tree,

```javascript
tree.print();

                     7

         3                           13

   1            5             9                   17

      2      4      6      8      11         15       18

                                         14               19
```


Written by JT Bowler, 2016.
