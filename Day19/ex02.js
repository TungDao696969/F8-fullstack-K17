const myArr = [
  ["hello", "world"],
  ["javascript", "php"],
  ["css", "html"],
];
// Tạo mảng mới viết hoa tất cả từ.
const newArr = myArr.map((value, index) => {
    let result = [];
    for (let i = 0; i < value.length; i++) {
        result.push(value[i].toUpperCase());
    }
    return result;
})
console.log(newArr);


// Lọc ra các từ có độ dài > 4.
const lengFour = [];
myArr.filter((value) => {
    for (let i = 0; i < value.length; i++) {
        if (value[i].length > 4) {
            lengFour.push(value[i])
        }
    }
    
})
console.log(lengFour);

// Ghép tất cả thành 1 mảng 1 chiều.

const arr = [];
myArr.map((value) => {
    for (let i = 0; i < value.length; i++ ) {
        arr.push(value[i]);
    }
})
console.log(arr);
