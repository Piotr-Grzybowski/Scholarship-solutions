"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.someFn = exports.everyFn = exports.filterFn = exports.mapFn = void 0;
function mapFn(array, callback) {
    return array.reduce((acc, element, index, array) => {
        return [...acc, callback(element, index, array)];
    }, []);
}
exports.mapFn = mapFn;
function filterFn(array, callback) {
    return array.reduce((acc, element, index, array) => {
        if (callback(element, index, array))
            acc.push(element);
        return acc;
    }, []);
}
exports.filterFn = filterFn;
function everyFn(array, callback) {
    return array.reduce((acc, element, index, array) => {
        if (!callback(element, index, array)) {
            acc = false;
            array.slice();
        }
        return acc;
    }, true);
}
exports.everyFn = everyFn;
function someFn(array, callback) {
    return array.reduce((acc, element, index, array) => {
        if (callback(element, index, array))
            acc = true;
        return acc;
    }, false);
}
exports.someFn = someFn;
