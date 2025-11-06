const arr = [[3, 9], [1, 5, 10], [8]];

const max = arr.flat(Infinity).reduce((acc, cur) => {
    if (acc < cur) {
        return cur;
    }
    return acc;
});
console.log("Số lớn nhất là: ", max);


