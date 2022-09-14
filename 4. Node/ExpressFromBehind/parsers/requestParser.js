"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.requestParser = void 0;
const requestBodyParser_1 = require("./requestBodyParser");
async function requestParser(req, query, params) {
    const body = await (0, requestBodyParser_1.getRequestBody)(req);
    const additives = {
        body: body ? JSON.parse(String(body)) : {},
        query: query || {},
        params: params || {},
    };
    const request = Object.assign(additives, req);
    return request;
}
exports.requestParser = requestParser;
