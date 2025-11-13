const orders = [
  {
    orderId: 101,
    customer: "John",
    items: [{ name: "Laptop", price: 1000, quantity: 1 }],
  },
  {
    orderId: 102,
    customer: "Alice",
    items: [
      { name: "Phone", price: 500, quantity: 2 },
      { name: "Charger", price: 50, quantity: 3 },
    ],
  },
  {
    orderId: 103,
    customer: "Bob",
    items: [{ name: "Headphones", price: 200, quantity: 2 }],
  },
];

// Tính tổng tiền của từng đơn hàng.
const result = orders.map((order) => {
    const total = order.items.reduce((acc, item) => {
        return acc += item.price * item.quantity;
    }, 0);
    return {
        orderId: order.orderId,
        customer: order.customer,
        total: total
    }
    
});
console.log("Tổng giá của từng đơn hàng là: ", result);

// Tìm khách hàng có đơn hàng có tổng tiền cao nhất.
const sum = result.reduce((acc, item) => {
    return item.total > acc.total ? item:acc;
});
console.log("Khách có tổng giá đơn hàng lớn nhất là: ", sum);

// Gộp danh sách tất cả các sản phẩm từ các đơn hàng, nhóm theo tên sản phẩm và tính tổng số lượng của mỗi sản phẩm.
const fun = orders.flatMap((order) => {
    return order.items;
});

const grouded = fun.reduce((acc, item) => {
    if (!acc[item.name]) {
        acc[item.name] = {name: item.name, totalQuantity: item.quantity}
    }else {
        acc[item.name].totalQuantity += item.quantity;
    }
    return acc;
}, {});
const a = Object.values(grouded)
console.log(a);

