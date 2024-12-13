class Node {
  constructor(data) {
    this.data = data;
    this.left = null;
    this.right = null;
  }
}

export default class BinarySearchTree {
  constructor(array) {
    /*
    take an array
    create a new set to remove duplicates
    sort alphabetically
    pass sorted array to buildTree
    */
    this.root = this.buildTree([...new Set(array)].sort((a, b) => a - b));
  }

  buildTree(array) {
    if (array.length === 0) return null;

    const mid = Math.floor(array.length / 2);
    const node = new Node(array[mid]);

    node.left = this.buildTree(array.slice(0, mid));
    node.right = this.buildTree(array.slice(mid + 1));

    return node;
  }

  prettyPrint = (node, prefix = "", isLeft = true) => {
    if (node === null) {
      return;
    }
    if (node.right !== null) {
      this.prettyPrint(
        node.right,
        `${prefix}${isLeft ? "│   " : "    "}`,
        false
      );
    }
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
    if (node.left !== null) {
      this.prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
    }
  };

  insert(value) {
    const insertRecursive = (node, value) => {
      if (node === null) return new Node(value);

      if (value < node.data) {
        node.left = insertRecursive(node.left, value);
      } else if (value > node.data) {
        node.right = insertRecursive(node.right, value);
      }

      return node;
    };

    this.root = insertRecursive(this.root, value);
  }

  delete(value) {
    const deleteRecursive = (node, value) => {
      /*
      check if tree is empty
      if value is lesser, go left
      if value is greater, go right
      else
        if node left child is null, return right child
        if node right child is null, return left child
        if node has two children, find the in-order successor (smallest node in the right subtree) and delete it
      return node
      */
      if (node === null) return null;

      if (value < node.data) {
        node.left = deleteRecursive(node.left, value);
      } else if (value > node.data) {
        node.right = deleteRecursive(node.right, value);
      } else {
        if (node.left === null) return node.right;
        if (node.right === null) return node.left;

        const successor = this.findMin(node.right);
        node.data = successor.data;
        node.right = deleteRecursive(node.right, successor.data);
      }

      return node;
    };

    this.root = deleteRecursive(this.root, value);
  }

  findMin(node) {
    while (node.left !== null) {
      node = node.left;
    }
    return node;
  }

  find(value) {
    const findRecursive = (node, value) => {
      if (node === null) return false;
      if (value < node.data) {
        return findRecursive(node.left, value);
      } else if (value > node.data) {
        return findRecursive(node.right, value);
      } else {
        return true;
      }
    };
    return findRecursive(this.root, value);
  }

  levelOrder(node, callback) {
    if (!callback) throw new Error("no callback provided");
    if (node === null) return;

    let queue = [];
    queue.push(node);

    while (queue.length > 0) {
      let current = queue.shift();
      callback(current.data);

      if (current.left !== null) queue.push(current.left);
      if (current.right !== null) queue.push(current.right);
    }
  }

  inOrder(node, callback) {
    if (!callback) throw new Error("no callback provided");
    if (node === null) return;

    this.inOrder(node.left, callback);
    callback(node.data);
    this.inOrder(node.right, callback);
  }

  preOrder(node, callback) {
    if (!callback) throw new Error("no callback provided");
    if (node === null) return;

    callback(node.data);
    this.preOrder(node.left, callback);
    this.preOrder(node.right, callback);
  }

  postOrder(node, callback) {
    if (!callback) throw new Error("no callback provided");
    if (node === null) return;

    this.postOrder(node.left, callback);
    this.postOrder(node.right, callback);
    callback(node.data);
  }

  height(node) {
    if (node === null) return 0;

    let leftHeight = this.height(node.left);
    let rightHeight = this.height(node.right);

    return Math.max(leftHeight, rightHeight) + 1;
  }

  depth(node, value) {
    if (node === null) return 0;

    let current = this.root;
    let depth = 0;
    while (current !== null) {
      if (current.data === value) {
        return depth;
      } else if (current.data < value) {
        current = current.right;
        depth++;
      } else {
        current = current.left;
        depth++;
      }
    }
    return null;
  }

  isBalanced() {
    if (this.root === null) return true;

    let leftHeight = this.height(this.root.left);
    let rightHeight = this.height(this.root.right);

    return Math.abs(leftHeight - rightHeight) <= 1;
  }

  rebalance(node) {
    if (node === null) return;
    let arr = [];
    this.inOrder(node, (data) => arr.push(data));
    console.log(arr);
    node = this.buildTree(arr);
    this.root = node;
  }
}
