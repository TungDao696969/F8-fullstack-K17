const scores = [
  [8, 9, 7], // học sinh 1
  [6, 5, 7], // học sinh 2
  [10, 9, 8], // học sinh 3
];

// Tính điểm trung bình của từng học sinh => [8, 6, 9].

const newArr = scores.map((value) => {
    let tottal = 0;
    for (let i = 0; i < value.length; i++) {
        tottal += value[i];
    }
    return tottal / value.length;
})
console.log(newArr);

// Lọc ra những học sinh có điểm trung bình >= 8.
const studentTB = scores.filter((value) => {
    let sum = 0;
    for (let i = 0; i < value.length; i++) {
        sum += value[i];
    }   
    const poin = sum / value.length;
    return poin >= 8
})
console.log(studentTB);

// Tạo mảng mới tăng tất cả điểm thêm 1 (nếu chưa vượt quá 10).
const arr = scores.map((value) => {
    for (let i = 0; i < value.length; i++) {
        if (value[i] < 10) {
            value[i] += 1;
        }
    }
    return value;
})
console.log(arr);

