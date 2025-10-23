
let n = 10;

let even = "";
let odd = "";

for (let i = 1; i <= n; i++) {
    if (i % 2 === 0) {
        even += i + "";
    }else {
        odd += i + "";
    }
}

console.log("Số chẵn:", even);
console.log("Số lẻ:", odd);
