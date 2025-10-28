function calcBMI (weight, height) {
    if (typeof weight !== "number" || typeof height !== "number" || weight === 0 || height === 0) {
        return "Không hợp lệ"
    }
    const BMI = weight / (height * height);

    if (BMI < 0) {
        return "Dữ liệu không hợp lệ";
    }else if (BMI < 18.5) {
        return "Thiếu cân";
    }else if (18.5 <= BMI && BMI < 23) {
        return "Bình thường"
    }else if (23 <= BMI && BMI < 25) {
        return "Thừa cân";
    }else {
        return "Béo phì";
    }
}

console.log(calcBMI("hi", 54));