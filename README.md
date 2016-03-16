# btree
A dependency-free rebalancing binary tree for JS

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

#### inOrderTraversal
An iterator that returns the nodes via:

1. Return node from left tree (recursive)
2. Return self
3. Return node from right tree (recursive)

```javascript
tree.inOrderTraversal(function (node) {
  console.log(node.value);
});
```


#### preOrderTraversal
An iterator that returns the nodes via:

1. Return self
2. Return node from left tree (recursive)
3. Return node from right tree (recursive)

```javascript
tree.preOrderTraversal(function (node) {
  console.log(node.value);
});
```


#### postOrderTraversal
An iterator that returns the nodes via:

1. Return node from left tree (recursive)
2. Return node from right tree (recursive)
3. Return self

```javascript
tree.postOrderTraversal(function (node) {
  console.log(node.value);
});
```

#### height
Returns the height of the tree.  With `n` nodes, the height of the
tree will be approximately `log(n)`.
```javascript
var tree = new Tree();
tree.bulkInsert(10, 5, 15, 2, 7, 12, 18);
tree.height();  // 3
```


#### print
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
