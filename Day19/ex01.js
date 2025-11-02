const myArr = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
];

// Tạo mảng chứa tổng từng hàng => [6, 15, 24].
const newArr = myArr.map((value, index) => {
    let total = 0;
    for (let i = 0; i < value.length; i++) {
        total += value[i];
    }
    return total;
})
console.log(newArr);

// Tạo mảng chứa tổng từng cột => [12, 15, 18].

const arr = [];
for (let i = 0; i < myArr[0].length; i++) {
    let sum = 0;
    for(let j = 0; j < myArr.length; j++) {
        sum += myArr[j][i];
    }
    arr.push(sum);
}
console.log(arr);

// Lọc ra các hàng có tổng > 10.

const result = myArr.filter((value, index) => {
    let a = 0;
    for (let i = 0; i < value.length; i++) {
        a += value[i];
    }
    return a > 10;
})
console.log(result);
