"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.promiseLastAsync = exports.promiseLast = exports.promiseIgnoreErrorsAsync = exports.promiseIgnoreErrors = exports.promiseRaceAsync = exports.promiseRace = exports.promiseAllAsync = exports.promiseAll = void 0;
const promiseAll = (arrayOfPromises) => {
    let arrayOfResults = [];
    let resolvedPromises = 0;
    return new Promise((resolve, reject) => {
        arrayOfPromises.forEach((promise, index) => {
            Promise.resolve(promise)
                .then((result) => {
                arrayOfResults[index] = result;
                resolvedPromises++;
                if (resolvedPromises === arrayOfPromises.length)
                    resolve(arrayOfResults);
            })
                .catch((err) => reject(err));
        });
    });
};
exports.promiseAll = promiseAll;
const promiseAllAsync = (arrayOfPromises) => {
    let arrayOfResults = [];
    let resolvedPromises = 0;
    return new Promise((resolve, reject) => {
        arrayOfPromises.forEach(async (promise, index) => {
            try {
                const result = await Promise.resolve(promise);
                arrayOfResults[index] = result;
                resolvedPromises++;
                if (resolvedPromises === arrayOfPromises.length)
                    resolve(arrayOfResults);
            }
            catch (err) {
                reject(err);
            }
        });
    });
};
exports.promiseAllAsync = promiseAllAsync;
const promiseRace = (arrayOfPromises) => {
    return new Promise((resolve, reject) => {
        arrayOfPromises.forEach((promise) => {
            Promise.resolve(promise)
                .then((result) => {
                resolve(result);
            })
                .catch((err) => {
                reject(err);
            });
        });
    });
};
exports.promiseRace = promiseRace;
const promiseRaceAsync = (arrayOfPromises) => {
    return new Promise((resolve, reject) => {
        arrayOfPromises.forEach(async (promise) => {
            try {
                const result = await Promise.resolve(promise);
                resolve(result);
            }
            catch (err) {
                reject(err);
            }
        });
    });
};
exports.promiseRaceAsync = promiseRaceAsync;
const promiseIgnoreErrors = (arrayOfPromises) => {
    let arrayOfResults = [];
    let resolvedPromises = 0;
    return new Promise((resolve, reject) => {
        arrayOfPromises.forEach((promise, index) => {
            Promise.resolve(promise)
                .then((result) => {
                arrayOfResults[index] = result;
                resolvedPromises++;
                if (resolvedPromises === arrayOfPromises.length)
                    resolve(arrayOfResults);
            })
                .catch((err) => {
                resolvedPromises++;
                if (resolvedPromises === arrayOfPromises.length)
                    resolve(arrayOfResults);
            });
        });
    });
};
exports.promiseIgnoreErrors = promiseIgnoreErrors;
const promiseIgnoreErrorsAsync = (arrayOfPromises) => {
    let arrayOfResults = [];
    let resolvedPromises = 0;
    return new Promise((resolve, reject) => {
        arrayOfPromises.forEach(async (promise, index) => {
            try {
                const result = await Promise.resolve(promise);
                arrayOfResults[index] = result;
                resolvedPromises++;
                if (resolvedPromises === arrayOfPromises.length)
                    resolve(arrayOfResults);
            }
            catch (err) {
                resolvedPromises++;
                if (resolvedPromises === arrayOfPromises.length)
                    resolve(arrayOfResults);
            }
        });
    });
};
exports.promiseIgnoreErrorsAsync = promiseIgnoreErrorsAsync;
const promiseLast = (arrayOfPromises) => {
    let counter = 0;
    let error;
    return new Promise((resolve, reject) => {
        arrayOfPromises.forEach((promise) => {
            Promise.resolve(promise)
                .then((result) => {
                counter++;
                if (counter === arrayOfPromises.length) {
                    if (error)
                        reject(error);
                    resolve(result);
                }
            })
                .catch((err) => {
                counter++;
                if (counter === arrayOfPromises.length)
                    reject(err);
            });
        });
    });
};
exports.promiseLast = promiseLast;
const promiseLastAsync = (arrayOfPromises) => {
    let counter = 0;
    let error;
    return new Promise((resolve, reject) => {
        arrayOfPromises.forEach(async (promise) => {
            try {
                const result = await Promise.resolve(promise);
                counter++;
                if (counter === arrayOfPromises.length) {
                    if (error)
                        reject(error);
                    resolve(result);
                }
            }
            catch (err) {
                counter++;
                if (counter === arrayOfPromises.length)
                    reject(err);
            }
        });
    });
};
exports.promiseLastAsync = promiseLastAsync;
