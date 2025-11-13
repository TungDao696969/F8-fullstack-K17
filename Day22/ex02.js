const students = [
  { id: 1, name: "An", scores: { math: 8, english: 7, science: 9 } },
  { id: 2, name: "Bình", scores: { math: 6, english: 8, science: 7 } },
  { id: 3, name: "Châu", scores: { math: 9, english: 6, science: 8 } },
];
// Tính điểm trung bình của từng học viên.
const result = students.map((student) => {
    const sum = Object.values(student.scores);
    // console.log(sum);
    const total = sum.reduce((acc, index) => {
        return acc += index;
    }, 0);
    
    const avg = total / sum.length;
    return {
        id: student.id,
        name: student.name,
        diemTb: avg
    };
}) 
console.log("Kết quả: ", result);


// Tìm học viên có điểm trung bình cao nhất.
const scoresOne = result.reduce((acc, index) => {
    return index.avg > acc.avg ? index : acc;
});
console.log("Sinh viên có điểm TB cao nhất là: ", scoresOne);

// Sắp xếp danh sách học viên theo điểm trung bình giảm dần.
const sorted = result.sort((a, b) => b.diemTb - a.diemTb);
console.log(sorted);
