function check (n) {
    if (typeof n !== "string") {
        return false;
    }

    return n === n.toUpperCase();
}
console.log(check("Tung"));
