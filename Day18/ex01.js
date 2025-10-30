const arr = [1, 2, 3, 4, 5, 6];
const newArr = [];
for (let i = 0; i < arr.length; i++) {
    newArr[i] = arr[i] * arr[i];
}
console.log(newArr);

const arrEven = [];
let index = 0;
for (value of arr) {
    if (value % 2 === 0) {
        arrEven[index] = value;
        index++;
    }
}
console.log(arrEven);


let arrOdd = [];
let odd = 0;
for (let i = 0; i < arr.length; i++) {
    if (arr[i] % 2 !== 0) {
        arrOdd[odd] = arr[i] * arr[i];
        odd++;
    }
}
console.log(arrOdd);
