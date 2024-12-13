const getKnightMoves = (knightPosition) => {
  const moves = [];
  const directions = [
    [-2, 1],
    [-2, -1],
    [2, 1],
    [2, -1],
    [-1, 2],
    [-1, -2],
    [1, 2],
    [1, -2],
  ];

  for (let direction of directions) {
    const move = [
      knightPosition[0] + direction[0],
      knightPosition[1] + direction[1],
    ];
    if (move[0] < 0 || move[0] > 7 || move[1] < 0 || move[1] > 7) {
      continue;
    }
    moves.push(move);
  }
  return moves;
};

const knightMoves = (start, end) => {
  if (start[0] < 0 || start[0] > 7 || start[1] < 0 || start[1] > 7) {
    throw new Error("start node out of bounds");
  }
  if (end[0] < 0 || end[0] > 7 || end[1] < 0 || end[1] > 7) {
    throw new Error("end node out of bounds");
  }
  if (start[0] === end[0] && start[1] === end[1]) {
    return start;
  }
  const queue = [];
  const visited = new Set();
  let startPosition = [start[0], start[1]];
  let pathToEnd = [startPosition];
  let tuple = [startPosition, pathToEnd];

  queue.push(tuple);

  while (queue.length > 0) {
    /* console.log(`Current position: ${startPosition}`);
    console.log(`Current path: ${pathToEnd.join(" -> ")}`);
    console.log(
      `Available moves: ${getKnightMoves(startPosition).join(" - ")}`
    );
    console.log(`Queue length: ${queue.length}`);
    console.log(`Unique nodes visited: ${visited.size}\n`); */
    let current = queue.shift();
    startPosition = current[0];
    pathToEnd = current[1];

    let moves = getKnightMoves(startPosition);
    for (let move of moves) {
      if (move[0] === end[0] && move[1] === end[1]) {
        console.log(
          `The shortest path from ${start} to ${end} takes ${pathToEnd.length} moves:`
        );
        return pathToEnd.concat([end]);
      }
      if (!visited.has(`${move[0]},${move[1]}`)) {
        visited.add(`${move[0]},${move[1]}`);
        queue.push([move, pathToEnd.concat([move])]);
      }
    }
  }
};

export { getKnightMoves, knightMoves };
