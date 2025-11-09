const users = [
  { name: "An", age: 25 },
  { name: "Bình", age: 30 },
  { name: "Chi", age: 22 },
];
// In ra tên của tất cả người dùng.
for (const key in users) {
    console.log('Tên của người dùng là: ', users[key].name);
}

// Tìm người có tuổi lớn nhất.
const result = users.reduce((acc, index) => {
    return index.age > acc.age ? index : acc;
});
console.log("Người có tuổi lớn nhất là: ", result);

// Tính tuổi trung bình của tất cả người dùng.
const totalAge = users.reduce((acc, index) => {
    return acc += index.age;
}, 0) / users.length;
console.log("Tuổi trung bình là: ", totalAge);
