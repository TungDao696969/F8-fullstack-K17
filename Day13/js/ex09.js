let kWh = 600;
let totalPrice = 0;

const PRICE_1 = 1678;
const PRICE_2 = 1734;
const PRICE_3 = 2014;
const PRICE_4 = 2536;
const PRICE_5 = 2834;
const PRICE_6 = 2927;


    if (kWh <= 50) {
        totalPrice = kWh * PRICE_1;
    }else if (51 <= kWh && kWh <= 100) {
        totalPrice = 50 * PRICE_1 + (kWh - 50) * PRICE_2;
    }else if (101 <= kWh && kWh <= 200) {
        totalPrice = 50 * PRICE_1 + 50 * PRICE_2 + (kWh - 100) * PRICE_3;
    }else if (201 <= kWh && kWh <= 300) {
        totalPrice = 50 * PRICE_1 + 50 * PRICE_2 + 100 * PRICE_3 + (kWh - 200) * PRICE_4
    }else if (301 <= kWh && kWh <= 400) {
        totalPrice = 50 * PRICE_1 + 50 * PRICE_2 + 100 * PRICE_3 + 100 * PRICE_4 + (kWh - 300) * PRICE_5; 
    }else {
        totalPrice = 50 * PRICE_1 + 50 * PRICE_2 + 100 * PRICE_3 + 100 * PRICE_4 + 100 * PRICE_5 + (kWh - 400) * PRICE_6;
    }
    console.log(totalPrice);
    
