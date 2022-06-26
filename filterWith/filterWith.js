"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.filterWith = void 0;
exports.filterWith = function (arr, phrase) {
    if (typeof phrase === 'string') {
        if (phrase.length <= 2)
            return [];
    }
    return arr.filter(function (element) {
        var values = Object.values(element);
        var result = findElement(values, phrase);
        if (result.length > 0)
            return true;
        return false;
    });
};
function findElement(arr, phrase) {
    var regex = new RegExp(phrase.toString().toLowerCase());
    return arr.filter(function (element) {
        if (typeof element === 'object') {
            if (Array.isArray(element)) {
                return findElement(element, phrase).length;
            }
            return findElement(Object.values(element), phrase).length;
        }
        if (typeof element === 'string')
            return regex.test(element.toLowerCase());
        if (typeof element === 'number')
            return regex.test(element.toString().toLowerCase());
        return false;
    });
}
