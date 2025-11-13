const inventory = [
  { item: "Laptop", type: "import", quantity: 10 },
  { item: "Mouse", type: "import", quantity: 50 },
  { item: "Laptop", type: "export", quantity: 4},
  { item: "Keyboard", type: "import", quantity: 20},
  { item: "Mouse", type: "export", quantity: 10 }
]
//Tính số lượng tồn kho của từng sản phẩm.
const result = inventory.reduce((acc, index) => {
    if (!acc[index.item]) {
        acc[index.item] = 0;
    }
    if (index.type === "import") {
        acc[index.item] += index.quantity;
    }
    if (index.type === "export") {
        acc[index.item] -= index.quantity;
    }
    return acc;
}, {});
console.log(result);

//Tìm sản phẩm có số lượng tồn kho cao nhất.
const sum = Object.entries(result).map(([name, quantitys]) => ({
    name, quantitys
}));
const isPrime = sum.reduce((acc, index) => {
    return index.quantitys > acc.quantitys ? index : acc;
});
console.log(isPrime);


//Nhóm danh sách nhập xuất theo sản phẩm, trong đó mỗi sản phẩm có lịch sử nhập xuất riêng.
const group = inventory.reduce((acc, index) => {
    if (!acc[index.item]) {
        acc[index.item] = [];
    }
    acc[index.item].push({
        item: index.item,
        type: index.type,
        quantity: index.quantity,
    });
    return acc;
}, {});
console.log(group);

