# btree
A rebalancing binary tree for JS

To install / use:
```javascript
npm install btree-js
```

### Basic Usage
```javascript
var BinaryTree = require('btree-js');
var Tree = BinaryTree.Tree;
var Node = BinaryTree.Node;

var tree = new Tree();
tree.insert(new Node({ key: 10, text: 'blah' }));  // becomes tree's root
tree.insert(new Node({ key: 15, text: 'plop' }));  // tree.root.right.key: 15
```

### API
---

#### search
Returns a node with the given key, if found.  Otherwise, returns `null`.
```javascript
var node = tree.search(15);
console.log(node.text);       // plop
console.log(node.parent.key); // 10
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
