const myArr = [
  [2, 4, 6],
  [8, 10, 12],
  [14, 16, 18],
];

// Lấy ra các phần tử trên đường chéo chính => [2, 10, 18].
const  newArr = myArr.map((value, index) => {
    return value[index];
})
console.log(newArr);

// Lấy ra các phần tử trên đường chéo phụ => [6, 10, 14].
const arr = myArr.map((value, index) => {
    return value[myArr.length - 1 - index];
})
console.log(arr);

// Tính tổng của đường chéo chính và phụ.
let sumMain = 0;
const totalMain = myArr.map((value, index) => {
    return sumMain += value[index]
})
console.log(sumMain);

let sum = 0;
const total = myArr.map((value, index) => {
    return sum += value[myArr.length -1 -index];
})
console.log(sum);
