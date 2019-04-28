const A =
[
  [ 1, 0, 1, 1, 0, 1, 0 ],
  [ 0, 0, 1, 0, 1, 0, 0 ],
  [ 1, 1, 1, 0, 1, 0, 0 ],
  [ 0, 1, 1, 1, 1, 0, 1 ],
  [ 1, 1, 1, 1, 0, 0, 1 ],
  [ 0, 1, 1, 1, 0, 0, 0 ]
];

const B =
[
  [ 1, 0, 1, 1, 0, 1, 0 ],
  [ 0, 0, 1, 0, 1, 0, 0 ],
  [ 1, 1, 1, 1, 1, 0, 0 ],
  [ 0, 1, 1, 1, 1, 0, 1 ],
  [ 1, 1, 1, 1, 1, 0, 1 ],
  [ 0, 1, 1, 1, 1, 0, 0 ]
];

const C =
[
  [ 1, 0, 1, 1, 0, 1, 0 ],
  [ 0, 0, 1, 0, 1, 0, 0 ],
  [ 1, 1, 1, 1, 0, 0, 0 ],
  [ 0, 1, 1, 1, 1, 0, 1 ],
  [ 1, 1, 1, 1, 1, 0, 1 ],
  [ 0, 0, 1, 1, 0, 0, 0 ]
];

function sumSequence(line, x) {
  let sum = 0;
  let newX = x;
  let findX = line && line[newX];

  while(findX === 1) {
    newX++;
    sum++;
    findX = line[newX];
  }

  return sum;
}

function findSquare(matrix, y, x, subtract = 1) {
  const topSquare = sumSequence(matrix[y], x) - (subtract - 1);
  let sum = topSquare;

  if (sum === 1)
    return 1
  
  for (let i = 1; i <= topSquare - 1; i++) {
    const newSum = sumSequence(matrix[y + i], x);
      
    if (newSum === topSquare)
      sum += newSum;
    else
      break;
  }

  return Math.pow(topSquare, 2) === sum ? sum : findSquare(matrix, y, x, subtract + 1);
}

function findLargerSquare(matrix) {
  let biggerSum = 0;
  
  for (let y = 0; y < matrix.length; y++) {
    for (let x = 0; x < matrix[y].length; x++) {
      const sum = findSquare(matrix, y, x);
      
      if (sum > 0)
        x += Math.sqrt(sum) - 1;
      
      if(sum > biggerSum)
        biggerSum = sum;
    }
  }

  return biggerSum;
}

console.log(A);
console.log(findLargerSquare(A));

console.log(B);
console.log(findLargerSquare(B));

console.log(C);
console.log(findLargerSquare(C));