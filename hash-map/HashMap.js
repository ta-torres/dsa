export default class HashMap {
  constructor(loadFactor = 0.75) {
    this.initialSize = 16;
    this.buckets = Array.from({ length: this.initialSize }, () => []);
    this.loadFactor = loadFactor;
    this.size = 0;
  }

  checkIndexBounds(index) {
    if (index < 0 || index >= this.buckets.length) {
      throw new Error("Trying to access index out of bound");
    }
  }

  hash(key) {
    let hashCode = 0;
    const primeNumber = 31;
    for (let i = 0; i < key.length; i++) {
      hashCode =
        (primeNumber * hashCode + key.charCodeAt(i)) % this.buckets.length;
    }
    return Math.abs(hashCode);
  }

  resize() {
    // make buckets copy
    // make new array with double the capacity
    // reset the size
    // rehash and insert old entries into new buckets
    const oldBuckets = this.buckets;
    this.buckets = Array.from({ length: this.buckets.length * 2 }, () => []);
    this.size = 0;

    for (const bucket of oldBuckets) {
      for (const [key, value] of bucket) {
        this.set(key, value);
      }
    }
  }

  set(key, value) {
    const index = this.hash(key);
    this.checkIndexBounds(index);
    const bucket = this.buckets[index];

    for (let i = 0; i < bucket.length; i++) {
      const [k, v] = bucket[i];
      if (k === key) {
        // if the key exists overwrite the value
        bucket[i] = [key, value];
        return; // stop the loop to avoid duplicates
      }
    }

    bucket.push([key, value]);
    this.size++;

    // check load factor and resize if it exceeds
    if (this.size / this.buckets.length > this.loadFactor) {
      this.resize();
    }
  }

  get(key) {
    const index = this.hash(key);
    this.checkIndexBounds(index);
    const bucket = this.buckets[index];

    for (const [k, v] of bucket) {
      if (k === key) return v;
    }
    return null;
  }

  has(key) {
    const index = this.hash(key);
    this.checkIndexBounds(index);
    const bucket = this.buckets[index];

    for (const [k, _] of bucket) {
      if (k === key) return true;
    }
    return false;
  }

  remove(key) {
    const index = this.hash(key);
    this.checkIndexBounds(index);
    const bucket = this.buckets[index];

    for (let i = 0; i < bucket.length; i++) {
      const [k, _] = bucket[i];
      if (k === key) {
        bucket.splice(i, 1);
        this.size--;
        return true;
      }
    }
    return false;
  }

  length() {
    return this.size;
  }

  clear() {
    this.buckets = Array.from({ length: this.initialSize }, () => []);
    this.size = 0;
  }

  keys() {
    const keys = [];
    for (const bucket of this.buckets) {
      for (const [k, _] of bucket) {
        keys.push(k);
      }
    }
    return keys;
  }

  values() {
    const values = [];
    for (const bucket of this.buckets) {
      for (const [_, v] of bucket) {
        values.push(v);
      }
    }
    return values;
  }

  entries() {
    const entries = [];
    for (const bucket of this.buckets) {
      for (const [k, v] of bucket) {
        entries.push([k, v]);
      }
    }
    return entries;
  }

  printHashMap() {
    return this.buckets;
  }
}
