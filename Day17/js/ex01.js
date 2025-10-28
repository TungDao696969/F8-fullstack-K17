function fibonacci (n) {
    if (n === 0) {
        return 0;
    }else if (n === 1) {
        return 1;
    }

    return fibonacci(n - 1) + fibonacci (n - 2)
}

function total (n) {
    if (n === 0) {
        return 0;
    }
    return fibonacci(n) + total(n - 1);
}
console.log(total(5));
