"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getIndex = void 0;
function getIndex(array, uuid) {
    return array.findIndex(function (element) { return element === uuid; });
}
exports.getIndex = getIndex;
