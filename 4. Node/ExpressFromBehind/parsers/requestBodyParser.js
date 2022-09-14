"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRequestBody = void 0;
function getRequestBody(req) {
    return new Promise((resolve, reject) => {
        let body = "";
        req.on("data", (chunk) => {
            body += chunk;
        });
        req.on("end", () => {
            resolve(body);
        });
        req.on("error", (err) => {
            reject(err);
        });
    });
}
exports.getRequestBody = getRequestBody;
