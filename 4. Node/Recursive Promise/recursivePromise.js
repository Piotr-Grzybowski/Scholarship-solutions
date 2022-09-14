"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.recursivePromise = void 0;
function recursivePromise(arrayOfPromises, currentIndex = 0, arrayOfResults = []) {
    return Promise.resolve(arrayOfPromises[currentIndex])
        .then((result) => {
        arrayOfResults.push(result);
        if (currentIndex === arrayOfPromises.length - 1) {
            return arrayOfResults;
        }
        return recursivePromise(arrayOfPromises, ++currentIndex, arrayOfResults);
    })
        .catch((error) => {
        if (!(error instanceof recursivePromiseError)) {
            throw new recursivePromiseError(arrayOfResults, error);
        }
        throw error;
    });
}
exports.recursivePromise = recursivePromise;
class recursivePromiseError extends Error {
    constructor(results, ...error) {
        super(...error);
        this.results = results;
    }
}
