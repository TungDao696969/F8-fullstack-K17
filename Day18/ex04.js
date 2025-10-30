const words = ["javascript", "php", "css", "html", "python", "java"];

// Lọc ra các từ có độ dài >= 5.
let newArr = [];
let index = 0;
for (let value of words) {
    if (value.length >= 5) {
        newArr[index] = value;
        index++;
    }
}
console.log(newArr);


// Tạo mảng mới viết hoa toàn bộ.
let arrUpperCase = [];
let sum = 0;

for (let a of words) {
    arrUpperCase[sum] = a.toUpperCase();
    sum++;
}
console.log(arrUpperCase);


// Tạo mảng mới viết ngược từng chuỗi (tpircsavaj, avaj...).
let arr = [];
let number = 0;

for (let word of words) {
    let result = "";
    for (let i = word.length - 1; i >= 0; i--) {
        result += word[i];
    }
    arr[number] = result;
    number++
}
console.log(arr);
