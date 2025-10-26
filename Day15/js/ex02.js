var a = 5, b = 9;
let totalEven = 0;
let totalOdd = 0;
for (let i = a; i <= b; i++ ) {
    if (i % 2 === 0) {
        totalEven += i;
    }else {
        totalOdd += i
    }
}
console.log(totalEven);
console.log(totalOdd);

