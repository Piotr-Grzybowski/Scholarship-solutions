"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generatePesel = void 0;
const validator_1 = require("./validator/validator");
const utils_1 = require("./utils/utils");
function generatePesel(dateOfBirth, gender) {
    if ((0, validator_1.validator)(dateOfBirth)) {
        const date = new Date(dateOfBirth);
        // add date to the pesel in proper format(yy/mm/dd)
        let pesel = (0, utils_1.formatDateForPesel)(date);
        // add three random digits
        for (let i = 0; i < 3; i++) {
            pesel += (0, utils_1.getRandomDigit)();
        }
        // add gender if included if not another random digit
        pesel += gender
            ? gender === "male"
                ? (0, utils_1.getRandomDigit)("odd")
                : (0, utils_1.getRandomDigit)("even")
            : (0, utils_1.getRandomDigit)();
        // create and add check digit
        pesel += (0, utils_1.generateCheckDigit)(pesel.split(""));
        return pesel;
    }
    throw new Error("Wrong date!");
}
exports.generatePesel = generatePesel;
