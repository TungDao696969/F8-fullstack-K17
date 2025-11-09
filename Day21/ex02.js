const products = [
  { name: "Laptop", price: 15000000 },
  { name: "Mouse", price: 250000 },
  { name: "Keyboard", price: 800000 },
];
// Tạo mảng mới chỉ chứa tên sản phẩm.
const result = products.reduce((acc, index) => {
    const fullName = index.name;
    acc.push(fullName);
    return acc;
}, []);
console.log(result);

// Tính tổng giá trị tất cả sản phẩm.
const totalPrice = products.reduce((acc, index) => {
    return acc += index.price;
}, 0);
console.log("Tổng giá là: ", totalPrice);

// Lọc ra sản phẩm có giá lớn hơn 1 triệu.
const isPrime = products.filter(item => item.price > 1000000);
console.log("Các sản phẩm có giá trị > 1tr là: ", isPrime);

