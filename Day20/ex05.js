const arr = [
  [1, 2, 3],
  [2, 3, 4],
  [4, 5],
];

const result = arr.flat(Infinity).reduce((acc, index) => {
    if (!acc.includes(index)) {
        acc.push(index);
    }
    return acc;
}, []);
console.log(result);
