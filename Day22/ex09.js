const transactions = [
  { id: 1, account: "A", type: "deposit", amount: 1000 },
  { id: 2, account: "B", type: "withdraw", amount: 200 },
  { id: 3, account: "A", type: "withdraw", amount: 500 },
  { id: 4, account: "C", type: "deposit", amount: 700 },
  { id: 5, account: "B", type: "deposit", amount: 300 },
];
//Tính số dư cuối cùng của từng tài khoản.
const result = transactions.reduce((acc, item) => {
    if (!acc[item.account]) {
        acc[item.account] = 0;
    }
    if (item.type === "deposit") {
        acc[item.account] += item.amount;
    }
    if (item.type === "withdraw") {
        acc[item.account] -= item.amount;
    }
    return acc;
}, {});
console.log(result);

// Tìm tài khoản có số dư cao nhất.
const bigAmount = Object.entries(result).map(([acc, balance]) => ({
    acc, balance
}));
const big = bigAmount.reduce((acc, index) => {
    return index.balance > acc.balance ? index:acc;
});
console.log(big);
 
// Nhóm các giao dịch theo tài khoản, trong đó mỗi tài khoản có danh sách giao dịch của riêng nó.
const sum = transactions.reduce((acc, item) => {
    if (!acc[item.account]) {
        acc[item.account] = [];
    }
    acc[item.account].push({
        type: item.type,
        amout: item.amount
    });
    return acc;
}, {});
console.log(sum);


