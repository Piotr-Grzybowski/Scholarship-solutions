"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.responseParser = void 0;
function responseParser(res) {
    res.send = (message) => res.end(message);
    res.json = (data) => {
        res.setHeader("Content-Type", "application/json");
        res.end(JSON.stringify(data));
    };
    return res;
}
exports.responseParser = responseParser;
