const products = [
  { id: 1, name: "Laptop", category: "Electronics", price: 1200 },
  { id: 2, name: "Phone", category: "Electronics", price: 800 },
  { id: 3, name: "Shirt", category: "Clothing", price: 40 },
  { id: 4, name: "Shoes", category: "Clothing", price: 60 },
  { id: 5, name: "Headphones", category: "Electronics", price: 150 },
];
// Lọc ra các sản phẩm thuộc danh mục "Electronics".
const result = products.filter((product) => {
    return product.category === "Electronics";
});
console.log("Các sản phẩm có danh mục là: ", result);

// Tính tổng giá của tất cả sản phẩm trong danh mục "Electronics".
const totalPrice = result.reduce((acc, item) => {
    return acc += item.price;
}, 0);
console.log("Tổng giá là: ", totalPrice);

// Chuyển đổi mảng sản phẩm thành một object, trong đó key là category, value là mảng các sản phẩm thuộc danh mục đó.
const categoryResult = products.reduce((acc, item) => {
    if (!acc[item.category]) {
        acc[item.category] = [];
    }
    acc[item.category].push(item);
    return acc;
}, {});
console.log(categoryResult);

