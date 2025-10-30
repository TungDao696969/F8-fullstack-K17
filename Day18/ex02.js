const names = [" hoang ", "AN", " f8 ", "Education"];

let newArr = [];
let index = 0;
for (value of names) {
    newArr[index] = value.trim().toLowerCase();
    index++;
}
console.log(newArr);


let newUpperCase = [];
let sum = 0;

for (let i = 0; i < names.length; i++) {
    let name = names[i].trim().toLowerCase();
    newUpperCase[sum] = name.charAt(0).toUpperCase() + name.slice(1);
    sum++;
}
console.log(newUpperCase);
