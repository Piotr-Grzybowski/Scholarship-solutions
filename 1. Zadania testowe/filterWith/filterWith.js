"use strict";
// class Validator {
//   static isString (string, err) {
//     if not string to daj error
//   }
// }
Object.defineProperty(exports, "__esModule", { value: true });
exports.filterWith = void 0;
exports.filterWith = (arr, phrase) => {
    if (typeof phrase === 'string') {
        if (phrase.length <= 2)
            return [];
    }
    return arr.filter(element => {
        const values = Object.values(element);
        const result = findElement(values, phrase);
        if (result.length > 0)
            return true;
        return false;
    });
};
const isObject = (obj) => {
    return Object.prototype.toString.call(obj) === '[object Object]';
};
function findElement(arr, phrase) {
    const regex = new RegExp(phrase.toString().toLowerCase());
    return arr.filter(element => {
        if (typeof element === 'string')
            return regex.test(element.toLowerCase());
        if (typeof element === 'number')
            return regex.test(element.toString().toLowerCase());
        if (isObject(element)) {
            return findElement(Object.values(element), phrase).length;
        }
        if (Array.isArray(element)) {
            return findElement(element, phrase).length;
        }
        return false;
    });
}
