import { getKnightMoves, knightMoves } from "./Knight.js";

console.log(`getKnightMoves from [0, 0] and [3, 3]`);
console.log(getKnightMoves([0, 0]));
console.log(getKnightMoves([3, 3]));

console.log(`knightMoves`);
console.log(knightMoves([0, 0], [0, 0]));
console.log(knightMoves([0, 0], [3, 3]));
console.log(knightMoves([0, 0], [7, 7]));
// console.log(knightMoves([4, 4], [0, 0]));
