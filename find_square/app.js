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
  [ 1, 1, 1, 1, 1, 0, 0 ],
  [ 0, 1, 1, 1, 1, 0, 1 ],
  [ 1, 1, 1, 1, 1, 0, 1 ],
  [ 0, 0, 1, 1, 1, 0, 0 ]
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

function findSquare(matrix, y, x) {
  let topSquare = sumSequence(matrix[y], x);
  let sum = topSquare;

  if (sum === 1)
    return 1
  
  for (let i = 1; i <= topSquare - 1; i++) {
    let count = topSquare - i;
    const newTopSquare = topSquare - (i - 1);
    sum = newTopSquare;
    
    for (let j = 1; j <= count; j++) {
      const newSum = sumSequence(matrix[y + j], x);
      
      if (newSum === newTopSquare)
        sum += newSum;
      else
        break;
    }

    if (Math.pow(newTopSquare, 2) === sum)
      break;
    else
      sum = 0;
  }

  return sum;
}

function findLargerSquare(matrix) {
  let biggerSum = 0;
  
  for (let y = 0; y < matrix.length; y++) {
    for (let x = 0; x < matrix[y].length; x++) {
      const sum = findSquare(matrix, y, x);
      x += Math.sqrt(sum);
      
      if(sum > biggerSum) {
        biggerSum = sum;
      }
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