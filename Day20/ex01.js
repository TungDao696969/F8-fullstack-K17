const arr = [[1, 2, 3], [4, 5], [6]];

const result = arr.flat(Infinity).reduce((total, index) => {
    return total += index;
}, 0)
console.log("Tổng các phần tử là: ", result);


