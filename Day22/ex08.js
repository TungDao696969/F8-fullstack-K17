const reviews = [
  { productId: "P1", userId: "U1", rating: 5 },
  { productId: "P2", userId: "U2", rating: 4 },
  { productId: "P1", userId: "U3", rating: 3 },
  { productId: "P3", userId: "U1", rating: 4 },
  { productId: "P2", userId: "U3", rating: 2 },
  { productId: "P1", userId: "U2", rating: 4 },
];
// Tính điểm trung bình đánh giá của mỗi sản phẩm.
const result = reviews.reduce((acc, item) => {
    if (!acc[item.productId]) {
        acc[item.productId] = {productId: item.productId, userId: item.userId, avg: 0, count: 0}
    }
    acc[item.productId].avg += item.rating;
    acc[item.productId].count += 1;
    return acc;
}, {});  
console.log("Điểm trung bình: ", result);

const sum = Object.entries(result).map(([productId, index]) => ({
    productId,
    diemTb: index.avg / index.count
}));
console.log(sum);

//Tìm sản phẩm có điểm trung bình cao nhất.
const bigAvg = sum.reduce((acc, index) => {
    return index.diemTb > acc.diemTb ? index: acc;
});
console.log("Sản phẩm có điểm trung bình cao nhất là: ", bigAvg);

//Nhóm danh sách đánh giá theo productId, trong đó mỗi sản phẩm có danh sách đánh giá của từng người dùng.

const isPrime = reviews.reduce((acc, item) => {
    if (!acc[item.productId]) {
        acc[item.productId] = [];
    }
    acc[item.productId].push({
        user: item.userId,
        rank: item.rating,
    });
    return acc;
}, {});
console.log(isPrime);
