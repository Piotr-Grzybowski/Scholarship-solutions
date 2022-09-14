"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validator = void 0;
const validator = (dateOfBirth) => {
    const date = new Date(dateOfBirth);
    if (Object.prototype.toString.call(date) !== "[object Date]")
        return false;
    if (date.getFullYear() < 1800 || date.getFullYear() > 2299)
        return false;
    return true;
};
exports.validator = validator;
