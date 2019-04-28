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
  let text = 'No squares found';
  
  for (let y = 0; y < matrix.length; y++) {
    for (let x = 0; x < matrix[y].length; x++) {
      const sum = findSquare(matrix, y, x);
      
      if(sum > biggerSum) {
        biggerSum = sum;
        const size = Math.sqrt(sum);

        text = `From matrix[${y}][${x}] to matrix[${y + size - 1}][${x + size - 1}]`;
      }

      if (sum > 0)
        x += Math.sqrt(sum) - 1;
    }
  }

  return {
    biggerSum,
    text,
  };
}

for (const m of [A, B, C]) {
  console.log('Matrix:');
  console.log(m);
  console.log('Sum: ', findLargerSquare(m).biggerSum);
  console.log('Coordanates: ', findLargerSquare(m).text);
  console.log('\n');
}
