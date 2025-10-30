const nums = [3, 7, 2, 9, 12, 15, 18];

let newArr = [];
let index = 0;

for (value of nums) {
    if (value >= 10) {
        newArr[index] = value;
        index++
    }
}
console.log("Mảng lớn hơn hoặc bằng 10 là : ", newArr);

let sum = [];
let a = 0;
for (item of newArr) {
    if (item % 3 === 0) {
        sum[a] = item;
        a++;
    }
}
console.log("Mảng mới chia hết cho 3 là: ", sum);


let arrOdd = [];
let odd = 0;

for (a of nums) {
    if (a % 2 !== 0) {
        arrOdd[odd] = a * 2;
        odd++;
    }
}
console.log(arrOdd);
