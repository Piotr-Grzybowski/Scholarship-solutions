"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.paramsParser = void 0;
function paramsParser(url, route) {
    const urlParts = url.split("/");
    const routeParts = route.split("/");
    let params = {};
    if (urlParts.length === routeParts.length) {
        for (let index = 0; index < routeParts.length; index++) {
            if (routeParts[index][0] === ":") {
                params[routeParts[index].replace(":", "")] = urlParts[index];
            }
            else if (routeParts[index] !== urlParts[index])
                return false;
        }
        return params;
    }
    return false;
}
exports.paramsParser = paramsParser;
