"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.promiseLastAsync = exports.promiseLast = exports.promiseIgnoreErrorsAsync = exports.promiseIgnoreErrors = exports.promiseRaceAsync = exports.promiseRace = exports.promiseAllAsync = exports.promiseAll = void 0;
exports.promiseAll = function (arrayOfPromises) {
    var arrayOfResults = [];
    var resolvedPromises = 0;
    return new Promise(function (resolve, reject) {
        arrayOfPromises.forEach(function (promise, index) {
            Promise.resolve(promise)
                .then(function (result) {
                arrayOfResults[index] = result;
                resolvedPromises++;
                if (resolvedPromises === arrayOfPromises.length)
                    resolve(arrayOfResults);
            })
                .catch(function (err) { return reject(err); });
        });
    });
};
exports.promiseAllAsync = function (arrayOfPromises) {
    var arrayOfResults = [];
    var resolvedPromises = 0;
    return new Promise(function (resolve, reject) {
        arrayOfPromises.forEach(function (promise, index) { return __awaiter(void 0, void 0, void 0, function () {
            var result, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, Promise.resolve(promise)];
                    case 1:
                        result = _a.sent();
                        arrayOfResults[index] = result;
                        resolvedPromises++;
                        if (resolvedPromises === arrayOfPromises.length)
                            resolve(arrayOfResults);
                        return [3 /*break*/, 3];
                    case 2:
                        err_1 = _a.sent();
                        reject(err_1);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); });
    });
};
exports.promiseRace = function (arrayOfPromises) {
    return new Promise(function (resolve, reject) {
        arrayOfPromises.forEach(function (promise) {
            Promise.resolve(promise)
                .then(function (result) {
                resolve(result);
            })
                .catch(function (err) {
                reject(err);
            });
        });
    });
};
exports.promiseRaceAsync = function (arrayOfPromises) {
    return new Promise(function (resolve, reject) {
        arrayOfPromises.forEach(function (promise) { return __awaiter(void 0, void 0, void 0, function () {
            var result, err_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, Promise.resolve(promise)];
                    case 1:
                        result = _a.sent();
                        resolve(result);
                        return [3 /*break*/, 3];
                    case 2:
                        err_2 = _a.sent();
                        reject(err_2);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); });
    });
};
exports.promiseIgnoreErrors = function (arrayOfPromises) {
    var arrayOfResults = [];
    var resolvedPromises = 0;
    return new Promise(function (resolve, reject) {
        arrayOfPromises.forEach(function (promise, index) {
            Promise.resolve(promise)
                .then(function (result) {
                arrayOfResults[index] = result;
                resolvedPromises++;
                if (resolvedPromises === arrayOfPromises.length)
                    resolve(arrayOfResults);
            })
                .catch(function (err) {
                resolvedPromises++;
                if (resolvedPromises === arrayOfPromises.length)
                    resolve(arrayOfResults);
            });
        });
    });
};
exports.promiseIgnoreErrorsAsync = function (arrayOfPromises) {
    var arrayOfResults = [];
    var resolvedPromises = 0;
    return new Promise(function (resolve, reject) {
        arrayOfPromises.forEach(function (promise, index) { return __awaiter(void 0, void 0, void 0, function () {
            var result, err_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, Promise.resolve(promise)];
                    case 1:
                        result = _a.sent();
                        arrayOfResults[index] = result;
                        resolvedPromises++;
                        if (resolvedPromises === arrayOfPromises.length)
                            resolve(arrayOfResults);
                        return [3 /*break*/, 3];
                    case 2:
                        err_3 = _a.sent();
                        resolvedPromises++;
                        if (resolvedPromises === arrayOfPromises.length)
                            resolve(arrayOfResults);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); });
    });
};
exports.promiseLast = function (arrayOfPromises) {
    var counter = 0;
    var error;
    return new Promise(function (resolve, reject) {
        arrayOfPromises.forEach(function (promise) {
            Promise.resolve(promise)
                .then(function (result) {
                counter++;
                if (counter === arrayOfPromises.length) {
                    if (error)
                        reject(error);
                    resolve(result);
                }
            })
                .catch(function (err) {
                counter++;
                if (counter === arrayOfPromises.length)
                    reject(err);
            });
        });
    });
};
exports.promiseLastAsync = function (arrayOfPromises) {
    var counter = 0;
    var error;
    return new Promise(function (resolve, reject) {
        arrayOfPromises.forEach(function (promise) { return __awaiter(void 0, void 0, void 0, function () {
            var result, err_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, Promise.resolve(promise)];
                    case 1:
                        result = _a.sent();
                        counter++;
                        if (counter === arrayOfPromises.length) {
                            if (error)
                                reject(error);
                            resolve(result);
                        }
                        return [3 /*break*/, 3];
                    case 2:
                        err_4 = _a.sent();
                        counter++;
                        if (counter === arrayOfPromises.length)
                            reject(err_4);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); });
    });
};
