"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = __importDefault(require("http"));
const url_1 = __importDefault(require("url"));
const requestParser_1 = require("./parsers/requestParser");
const responseParser_1 = require("./parsers/responseParser");
const paramsParser_1 = require("./parsers/paramsParser");
class myServer {
    constructor() {
        this.routeTable = {};
        this.server = http_1.default.createServer(async (req, res) => {
            let match = false;
            if (req.url && req.method) {
                for (const route of Object.keys(this.routeTable)) {
                    const { pathname, query } = url_1.default.parse(req.url, true);
                    const params = (0, paramsParser_1.paramsParser)(pathname, route);
                    if ((pathname === route || params) &&
                        this.routeTable[route][req.method.toLowerCase()]) {
                        const middlewares = this.routeTable[route][req.method.toLowerCase() + "-middlewares"];
                        const controller = this.routeTable[route][req.method.toLowerCase()];
                        const parsedRequest = await (0, requestParser_1.requestParser)(req, query, params);
                        const parsedResponse = (0, responseParser_1.responseParser)(res);
                        for (let middleware of middlewares) {
                            if (!res.writableEnded) {
                                await this.processMiddleware(middleware, parsedRequest, parsedResponse);
                            }
                        }
                        if (!res.writableEnded)
                            controller(parsedRequest, parsedResponse);
                        match = true;
                        break;
                    }
                }
                if (!match) {
                    res.statusCode = 404;
                    res.end("Not found");
                }
            }
        });
    }
    processMiddleware(middleware, req, res) {
        if (!middleware)
            return;
        return new Promise((resolve) => {
            middleware(req, res, function () {
                resolve(true);
            });
        });
    }
    registerRoute(route, method, callback, controllerOrMiddleware) {
        const controller = controllerOrMiddleware === "controller" ? callback : false;
        const middleware = controllerOrMiddleware === "middleware" ? callback : false;
        if (middleware) {
            this.routeTable[route][method + "-middlewares"].push(middleware);
            return;
        }
        if (!this.routeTable[route]) {
            this.routeTable[route] = {
                [method]: controller,
                [method + "-middlewares"]: [],
            };
            return;
        }
        this.routeTable[route] = {
            [method]: controller,
            [method + "-middlewares"]: this.routeTable[route][method + "-middlewares"]
                ? [...this.routeTable[route][method + "-middlewares"]]
                : [],
        };
    }
    addMiddleware(route, method, middleware) {
        if (this.routeTable[route] && this.routeTable[route][method]) {
            this.registerRoute(route, method, middleware, "middleware");
        }
        else {
            throw new Error("There is no such an endpoint registered!");
        }
    }
    addController(route, method, controller) {
        this.registerRoute(route, method, controller, "controller");
    }
    listen(port, cb) {
        this.server.listen(port, cb);
    }
}
exports.default = () => {
    return new myServer();
};
