const students = [
  { name: "Lan", scores: [8, 9, 7] },
  { name: "Huy", scores: [6, 5, 7] },
  { name: "Minh", scores: [9, 8, 10] },
];
// Tính điểm trung bình của từng học sinh.

const result = students.map((student) => {
    const total = student.scores.reduce((acc, index) => {
        return acc += index;
    }, 0);

    const avg = total / student.scores.length;
    return {
        name: student.name,
        diemTB: avg,
    };
});
console.log("Điểm trung bình của từng học sinh là: ", result);

// Trả về danh sách học sinh đạt loại giỏi (điểm TB >= 8).
const sum = result.filter(item => item.diemTB >= 8);
console.log("Học sinh đạt loại giỏi là: ", sum);

// Sắp xếp học sinh theo điểm trung bình giảm dần.
const isPrime = result.sort((a, b) => {
    if (a.diemTB > b.diemTB) {
        return -1;
    }
});
console.log(isPrime);

