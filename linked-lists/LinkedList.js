class Node {
  constructor() {
    this.value = null;
    this.nextNode = null;
  }
}

export default class LinkedList extends Node {
  constructor() {
    super();
    this.head = null;
  }

  append(value) {
    const newNode = new Node();
    newNode.value = value;

    let currentNode = this.head;

    while (currentNode.nextNode != null) {
      currentNode = currentNode.nextNode;
    }

    currentNode.nextNode = newNode;
  }

  prepend(value) {
    const newNode = new Node();
    newNode.value = value;
    newNode.nextNode = this.head;
    this.head = newNode;
  }

  toString() {
    let currentNode = this.head;
    let str = "";
    while (currentNode != null) {
      str += `( ${currentNode.value} ) -> `;
      currentNode = currentNode.nextNode;
    }
    str += "null";
    return str;
  }

  isEmpty() {
    return this.head === null;
  }

  size() {
    let currentNode = this.head;
    let counter = 0;
    while (currentNode != null) {
      counter++;
      currentNode = currentNode.nextNode;
    }
    return counter;
  }

  listHead() {
    return this.head.value;
  }

  tail() {
    let currentNode = this.head;
    while (currentNode.nextNode != null) {
      currentNode = currentNode.nextNode;
    }
    return currentNode.value;
  }

  at(index) {
    let currentNode = this.head;
    let counter = 0;
    while (counter < index) {
      currentNode = currentNode.nextNode;
      counter++;
    }
    if (currentNode === null) return null;
    return currentNode.value;
  }

  pop() {
    /*
    create a new pointer to the head of the list
    create a new pointer to the next node
    traverse until the next node is different from null
      move both pointers one node forward
    set the next pointer of the current node to null
    */
    let currentNode = this.head;
    let nextNode = currentNode.nextNode;
    while (nextNode.nextNode != null) {
      currentNode = currentNode.nextNode;
      nextNode = currentNode.nextNode;
    }
    currentNode.nextNode = null;
  }

  contains(value) {
    let currentNode = this.head;
    while (currentNode != null) {
      if (currentNode.value === value) return true;
      currentNode = currentNode.nextNode;
    }
    return false;
  }

  find(value) {
    let currentNode = this.head;
    let index = 0;
    while (currentNode != null) {
      if (currentNode.value === value) return index;
      currentNode = currentNode.nextNode;
      index++;
    }
    return null;
  }

  insertAt(value, index) {
    /* 
    check if index is valid
    if index is 0 prepend
    if index is bigger than size append
    create a new node
    insert the new node at the index
    */
    if (index < 0) throw new Error("Index cannot be negative");
    if (index === 0) return this.prepend(value);
    if (index >= this.size()) return this.append(value);

    const newNode = new Node();
    newNode.value = value;
    let currentNode = this.head;
    for (let i = 0; i < index - 1; i++) {
      currentNode = currentNode.nextNode;
    }
    newNode.nextNode = currentNode.nextNode;
    currentNode.nextNode = newNode;
  }

  removeAt(index) {
    if (this.isEmpty()) return;
    if (index < 0 || index > this.size()) return;
    if (index === 0) {
      this.head = this.head.nextNode;
      return;
    }
    let currentNode = this.head;
    for (let i = 0; i < index - 1; i++) {
      currentNode = currentNode.nextNode;
    }
    currentNode.nextNode = currentNode.nextNode.nextNode;
  }
}
