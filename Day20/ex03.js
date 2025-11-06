const arr = [
  [1, 2, 3],
  [4, 5, 6],
];

const result = arr.flat(Infinity).filter((sum) => {
    return sum % 2 === 0;
}).length
console.log(result);
