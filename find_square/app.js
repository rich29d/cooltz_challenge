const matrix =
[
  [ 1, 0, 1, 1, 0, 1, 0 ],
  [ 0, 0, 1, 0, 1, 0, 0 ],
  [ 1, 1, 1, 1, 1, 0, 0 ],
  [ 0, 1, 1, 1, 1, 0, 1 ],
  [ 1, 1, 1, 1, 1, 0, 1 ],
  [ 0, 1, 1, 1, 1, 0, 0 ]
];

let biggerSum = 0;

function findLine(y, x) {
  let sum = 0;
  let newX = x;
  let findX = matrix[y] && matrix[y][newX];

  while(findX === 1) {
    newX++;
    sum++;
    findX = matrix[y][newX];
  }

  return sum;
}

function findSquare(y, x) {
  let topSquare = findLine(y, x);
  let sum = topSquare;

  if (sum === 1)
    return 1
  
  for (let i = 1; i <= topSquare - 1; i++) {
    let count = topSquare - i;
    const newTopSquare = topSquare - (i - 1);
    sum = newTopSquare;
    
    for (let j = 1; j <= count; j++) {
      const newSum = findLine(y + j, x);
      
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

for (let y = 0; y < matrix.length; y++) {
  for (let x = 0; x < matrix[y].length; x++) {
    const sum = findSquare(y, x);
    
    if(sum > biggerSum) {
      biggerSum = sum;
      subMatrix.init.x = x;
      subMatrix.init.y = y;
    }
  }
}

console.log(biggerSum);