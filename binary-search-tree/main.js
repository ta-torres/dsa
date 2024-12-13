import BinarySearchTree from "./BinarySearchTree.js";

const tree = new BinarySearchTree([
  1, 7, 4, 8, 9, 4, 3, 15, 5, 7, 9, 69, 100, 105,
]);
tree.prettyPrint(tree.root);

console.log(`Add node 10`);
tree.insert(10);
tree.prettyPrint(tree.root);

console.log(`Delete node 4`);
tree.delete(4);
tree.prettyPrint(tree.root);

console.log(`Find node 4: ${tree.find(4)}`);
console.log(`Find node 10: ${tree.find(10)}`);

console.log(`In order traversal: `);
tree.inOrder(tree.root, console.log);
console.log(`Pre order traversal: `);
tree.preOrder(tree.root, console.log);
console.log(`Post order traversal: `);
tree.postOrder(tree.root, console.log);

console.log(`Level order traversal: `);
tree.prettyPrint(tree.root);
tree.levelOrder(tree.root, console.log);

console.log(`Height of the tree: ` + tree.height(tree.root));
console.log(`Depth of node 10: ` + tree.depth(tree.root, 10));
console.log(`Depth of node 8: ` + tree.depth(tree.root, 8));
console.log(`Depth of node 7: ` + tree.depth(tree.root, 7));
console.log(`Depth of node 4: ` + tree.depth(tree.root, 4));

console.log(`isBalanced: ` + tree.isBalanced());
console.log(`delete nodes 1, 3, 7`);
tree.delete(1);
tree.delete(3);
tree.delete(7);
tree.prettyPrint(tree.root);
console.log(`isBalanced: ` + tree.isBalanced());

console.log(`Rebalance the tree`);
tree.rebalance(tree.root);
tree.prettyPrint(tree.root);
