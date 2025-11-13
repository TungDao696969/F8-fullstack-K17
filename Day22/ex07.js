const employees = [
  { id: 1, name: "An", projects: ["P1", "P2"] },
  { id: 2, name: "Bình", projects: ["P2", "P3"] },
  { id: 3, name: "Châu", projects: ["P1", "P3", "P4"] },
  { id: 4, name: "Dũng", projects: ["P4", "P2"] },
];
// Nhóm nhân viên theo dự án, sao cho mỗi dự án có danh sách nhân viên tham gia.
const result = employees.reduce((acc, employee) => {
    employee.projects.forEach((item) => {
        if (!acc[item]) {
            acc[item] = [];
        }
        acc[item].push(employee.name);
    })
    return acc;
}, []);
console.log(result);

// Tìm dự án có nhiều nhân viên tham gia nhất.
const projectCount = employees.reduce((acc, employee) => {
  employee.projects.forEach(project => {
    acc[project] = (acc[project] || 0) + 1;
  });
  return acc;
}, {});
console.log(projectCount);

const a = Object.entries(projectCount).reduce((acc, item) => {
    return item[1] > acc[1] ? item:acc;
});
console.log(a);




