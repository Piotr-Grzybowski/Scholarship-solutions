"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkPesel = void 0;
// function checks if pesel is valid created for testing purpose
const utils_1 = require("./utils");
function checkPesel(pesel) {
    const checkSum = pesel.split("").reduce((acc, element, index) => {
        return (acc += parseInt(element) * (utils_1.digitWeight[index] || 1));
    }, 0);
    return checkSum % 10 === 0;
}
exports.checkPesel = checkPesel;
