"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRandomDigit = exports.generateCheckDigit = exports.formatDateForPesel = exports.digitWeight = void 0;
// helper object for generateCheckDigit function
exports.digitWeight = {
    0: 1,
    1: 3,
    2: 7,
    3: 9,
    4: 1,
    5: 3,
    6: 7,
    7: 9,
    8: 1,
    9: 3,
};
// helper object for formatDateForPesel function
const centuries = {
    18: 80,
    19: 0,
    20: 20,
    21: 40,
    22: 60,
};
// given date returns it as a string in format yy/mm/dd
function formatDateForPesel(date) {
    const century = Math.floor(date.getFullYear() / 100);
    const year = date.getFullYear() % 100 < 10
        ? "0" + (date.getFullYear() % 100)
        : (date.getFullYear() % 100) + "";
    const month = date.getMonth() + centuries[century] < 10
        ? "0" + (date.getMonth() + centuries[century] + 1)
        : date.getMonth() + centuries[century] + 1 + "";
    const day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate() + "";
    return year + month + day;
}
exports.formatDateForPesel = formatDateForPesel;
// function creates 11th digit of pesel number checkDigit(liczba kontrolna)
function generateCheckDigit(array) {
    const checkDigit = array
        .map((element, index) => {
        return parseInt(element) * exports.digitWeight[index];
    })
        .reduce((acc, element) => {
        return acc + element;
    }, 0) % 10;
    return checkDigit ? 10 - checkDigit : 0;
}
exports.generateCheckDigit = generateCheckDigit;
const getRandomDigit = (oddOrEven) => {
    if (oddOrEven === "even")
        return Math.floor((Math.random() * 10) / 2) * 2;
    if (oddOrEven === "odd")
        return Math.floor(Math.random() * 5) * 2 + 1;
    return Math.floor(Math.random() * 10);
};
exports.getRandomDigit = getRandomDigit;
