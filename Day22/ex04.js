const employees = [
  { id: 1, name: "Mai", department: "IT", salary: 1200 },
  { id: 2, name: "Nam", department: "HR", salary: 800 },
  { id: 3, name: "Hà", department: "IT", salary: 1500 },
  { id: 4, name: "Linh", department: "Marketing", salary: 900 },
  { id: 5, name: "Phúc", department: "IT", salary: 1100 },
];
// Tính tổng lương của từng phòng ban.
const result = employees.reduce((acc, employee) => {
    if (!acc[employee.department]) {
        acc[employee.department] = {department: employee.department, totalPrice: 0}
    }

    acc[employee.department].totalPrice += employee.salary;
    return acc;
}, {});

console.log(result);

// Tìm nhân viên có mức lương cao nhất trong mỗi phòng ban.
const findEmployee = employees.reduce((acc, item) => {
    return item.salary > acc.salary ? item: acc;
});
console.log("Nhân viên có mức lương cao nhất là: ",findEmployee);

// Chuyển đổi dữ liệu về dạng object, trong đó key là tên phòng ban, value là mảng nhân viên trong phòng ban đó.
const resultC = employees.reduce((acc, index) => {
    if (!acc[index.department]) {
        acc[index.department] = {department: index.department, name: []}
    }
    acc[index.department].name.push(index.name);

    return acc;
}, {});
console.log(resultC);

