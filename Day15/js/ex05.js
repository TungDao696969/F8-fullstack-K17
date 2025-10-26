function isPrime (n) {
    if (n < 0 || n > 9999) {
        return "Không hợp lệ";
    }
    if (n === 0) {
        return "Không";
    }

    let result = "";

    let thousand = Math.floor(n / 1000);
    switch (thousand) {
        case 1: 
            result += "Một nghìn ";
        break;
         case 2: 
            result += "Hai nghìn ";
        break;
         case 3: 
            result += "Ba nghìn ";
        break;
         case 4: 
            result += "Bốn nghìn ";
        break;
         case 5: 
            result += "Năm nghìn ";
        break;
         case 6: 
            result += "Sáu nghìn ";
        break;
         case 7: 
            result += "Bảy nghìn ";
        break;
         case 8: 
            result += "Tám nghìn ";
        break;
         case 9: 
            result += "Chín nghìn ";
        break;
    }

    let hundered = Math.floor((n % 1000) / 100);
    switch (hundered) {
        case 1: result += "một trăm "; break
        case 2: result += "hai trăm "; break
        case 3: result += "ba trăm "; break
        case 4: result += "bốn trăm "; break
        case 5: result += "năm trăm "; break
        case 6: result += "sáu trăm "; break
        case 7: result += "bảy trăm "; break
        case 8: result += "tám trăm "; break
        case 9: result += "chín trăm "; break
    }

    let ten = Math.floor((n % 100) / 10);
     switch (ten) {
        case 1: result += "một "; break
        case 2: result += "hai mươi "; break
        case 3: result += "ba mươi "; break
        case 4: result += "bốn mươi "; break
        case 5: result += "năm mươi "; break
        case 6: result += "sáu mươi "; break
        case 7: result += "bảy mươi "; break
        case 8: result += "tám mươi "; break
        case 9: result += "chín mươi "; break
    }

    let unit = n % 10;
     switch (unit) {
        case 1: result += "một "; break
        case 2: result += "hai "; break
        case 3: result += "ba "; break
        case 4: result += "bốn "; break
        case 5: result += "năm "; break
        case 6: result += "sáu "; break
        case 7: result += "bảy "; break
        case 8: result += "tám "; break
        case 9: result += "chín "; break
    }

    return result.trim();
}
console.log(isPrime(4298));
console.log(isPrime(999));

