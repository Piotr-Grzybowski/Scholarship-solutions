"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.someFn = exports.everyFn = exports.reduceFn = exports.filterFn = exports.entriesFnGen = exports.entriesFn = exports.mapFn = exports.forEachFn = void 0;
const forEachFn = (array, callback) => {
    for (let i = 0; i < array.length; i++) {
        callback(array[i], i, array);
    }
};
exports.forEachFn = forEachFn;
const mapFn = (array, callback) => {
    let newArray = [];
    for (let i = 0; i < array.length; i++) {
        newArray.push(callback(array[i], i, array));
    }
    return newArray;
};
exports.mapFn = mapFn;
/**
 * Method entries() returns iterator with method next that lets us access next element
 * Every element has format {done: false/true, value: [index, value]}
 * Value of done define if iteration is finished or not
 * Under value property we can find an array with index and value of current element
 */
const entriesFn = (array) => {
    const newArray = [];
    for (let index = 0; index < array.length; index++) {
        newArray.push([index, array[index]]);
    }
    return newArray[Symbol.iterator]();
};
exports.entriesFn = entriesFn;
/**
 * Solution of method entries() but using generator instead Symbol.iterator method
 */
function* entriesFnGen(array) {
    for (let i = 0; i < array.length; i++)
        yield [i, array[i]];
}
exports.entriesFnGen = entriesFnGen;
const filterFn = (array, callback) => {
    let newArray = [];
    for (let i = 0; i < array.length; i++) {
        if (callback(array[i], i, array)) {
            newArray.push(array[i]);
        }
    }
    return newArray;
};
exports.filterFn = filterFn;
const reduceFn = (array, callback, initial) => {
    if (array.length < 1 && !initial) {
        throw new Error("Type Error");
    }
    let accumulator;
    accumulator = initial || array[0];
    for (let i = initial ? 0 : 1; i < array.length; i++) {
        accumulator = callback(accumulator, array[i], i, array);
    }
    return accumulator;
};
exports.reduceFn = reduceFn;
const everyFn = (array, callback) => {
    for (let i = 0; i < array.length; i++) {
        if (!callback(array[i], i, array)) {
            return false;
        }
    }
    return true;
};
exports.everyFn = everyFn;
const someFn = (array, callback) => {
    for (let i = 0; i < array.length; i++) {
        if (!callback(array[i], i, array)) {
            return true;
        }
    }
    return false;
};
exports.someFn = someFn;
