# btree
A rebalancing binary tree for JS

To install / use:
```javascript
npm install btree-js
```

#### Basic Usage
```javascript
var BinaryTree = require('btree-js');
var Tree = BinaryTree.Tree;
var Node = BinaryTree.Node;

var tree = new Tree();
tree.insert(new Node({ key: 10, text: 'blah' }));  // becomes tree's root
tree.insert(new Node({ key: 15, text: 'plop' }));  // tree.root.right.key: 15
```

### Options
##### key
The binary tree defaults to *key* property unless a key is explicitly passed in.

```
var tree = new Tree({ key: 'id' });
tree.insert(1);
console.log(tree.root.id); // 1
```

##### unique
The binary tree defaults to allowing multiple identical keys.  If `unique: true` is passed in as an option, it will throw an error when inserting a duplicate key.

```
var tree = new Tree({ unique: true });
tree.bulkInsert(1, 1);  // throws duplicate key violation
```

### API
#### isEmpty
Returns whether or not the tree has nodes in it.
```javascript
var tree = new Tree();
console.log(tree.isEmpty()); // true

tree.insert(new Node({ key: 6 });
console.log(tree.isEmpty()); // false

tree.delete(6);
console.log(tree.isEmpty()); // true
```

#### delete
Allows you to pass in either a node or a key to delete that node from the tree.  If the tree becomes unbalanced as a result, it will rebalance itself.

```javascript
tree.bulkInsert(5, 3, 10, 8);
tree.print();

         5

    3              10

              8

tree.delete(3);
tree.print();

         8

    5         10
```

#### min
Returns the minimum key in the tree.  If a node is provided, it will find the minimum key in that subtree.

```javascript
tree.bulkInsert(50, 25, 90, 180, 40);
console.log(tree.min().key); // 25

tree.delete(tree.min());
console.log(tree.min().key); // 40
```

#### max
Returns the maximum key in the tree.  If a node is provided, it will find the maximum key in that subtree.

```javascript
tree.bulkInsert(50, 25, 90, 180, 40);
console.log(tree.max().key); // 180

tree.delete(tree.max());
console.log(tree.max().key); // 90
```

#### search
Returns a node with the given key, if found.  Otherwise, returns `null`.
```javascript
tree.insert(new Node({ key: 10, text: 'blah' }));
tree.insert(new Node({ key: 15, text: 'plop' }));

var node = tree.search(15);
console.log(node.text);       // plop
console.log(node.parent.key); // 10
```

#### findPaths
Returns a list of paths from the root to the leaf (array of array of nodes).

```
tree.bulkInsert(2, 1, 3);
var paths = tree.findPaths();
paths.forEach(function path) {
  var keys = path.map(function (node) { return node.key; });
  console.log(keys.join(' '));
});

// 2 1
// 2 3
```

#### height
Returns the height of the tree.  With `n` nodes, the height of the
tree will be approximately `log(n)`.
```javascript
var tree = new Tree();
tree.bulkInsert(10, 5, 15, 2, 7, 12, 18);
tree.height();  // 3
```

#### invert
Inverts the tree by taking all the node pointers and flipping them.

```javascript
tree.bulkInsert(50, 25, 75, 60, 90);
tree.print();

         50

    25              75

              60         90

tree.invert();
tree.print();

         90

    25              50

              60         75
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


Written by JT Bowler, 2016.
