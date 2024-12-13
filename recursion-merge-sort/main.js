// https://www.theodinproject.com/lessons/javascript-recursion

function mergeSort(arr) {
  if (arr.length <= 1) return arr;

  let middle = Math.floor(arr.length / 2);
  let left = arr.slice(0, middle);
  let right = arr.slice(middle);
  if (left.length > 1) {
    left = mergeSort(left);
  }
  if (right.length > 1) {
    right = mergeSort(right);
  }
  return merge(left, right);
}
function merge(left, right) {
  let result = [];
  while (left.length && right.length) {
    if (left[0] <= right[0]) {
      result.push(left.shift());
    } else {
      result.push(right.shift());
    }
  }
  return result.concat(left, right);
}

console.log(mergeSort([]));
console.log(mergeSort([1]));
console.log(mergeSort([3, 2, 1, 13, 8, 5, 0, 1])); /// [0, 1, 1, 2, 3, 5, 8, 13]
console.log(mergeSort([1, 2, 3, 4, 5, 6, 7, 8, 9]));
