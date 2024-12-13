// https://www.theodinproject.com/lessons/javascript-recursion

function fibs(n) {
  let arr = [0, 1];
  for (let i = 0; i < n; i++) {
    if (i < 2) continue;
    arr.push(arr[i - 1] + arr[i - 2]);
  }
  return arr;
}

console.log(`fibs`);
console.log(fibs(0));
console.log(fibs(1));
console.log(fibs(8));

function fibsRec(n, arr = [0, 1]) {
  if (arr.length > n) return arr;

  if (arr.length < n) {
    arr.push(arr[arr.length - 1] + arr[arr.length - 2]);
    return fibsRec(n, arr);
  }

  return arr;
}
console.log(`fibsRec`);
console.log(fibsRec(0));
console.log(fibsRec(1));
console.log(fibsRec(8));
