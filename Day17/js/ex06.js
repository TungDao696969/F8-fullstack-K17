function isPrime (str) {
    if (typeof str !== "string"){
        return false;
    }

    let n = str.indexOf(" ");
    let n2 = str.lastIndexOf(" ");

    return str.slice(n2 + 1) + str.slice(n, n2 + 1) + str.slice(0, n);
}
console.log(isPrime("Tôi là Tùng"));
