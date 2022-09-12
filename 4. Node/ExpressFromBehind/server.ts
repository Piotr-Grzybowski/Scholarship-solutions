import http from "http";
import url from "url";
import {
  middleware,
  controller,
  IParsedRequest,
  IParsedResponse,
  method,
} from "./types";
import { requestParser } from "./parsers/requestParser";
import { responseParser } from "./parsers/responseParser";
import { paramsParser } from "./parsers/paramsParser";

class myServer {
  private routeTable = {};

  server = http.createServer(
    async (req: IParsedRequest, res: IParsedResponse) => {
      let match = false;
      if (req.url && req.method) {
        for (const route of Object.keys(this.routeTable)) {
          const { pathname, query } = url.parse(req.url, true);
          const params = paramsParser(pathname, route);

          if (
            (pathname === route || params) &&
            this.routeTable[route][req.method.toLowerCase()]
          ) {
            const middlewares =
              this.routeTable[route][req.method.toLowerCase() + "-middlewares"];
            const controller = this.routeTable[route][req.method.toLowerCase()];

            const parsedRequest: IParsedRequest = await requestParser(
              req,
              query,
              params
            );
            const parsedResponse: IParsedResponse = responseParser(res);

            for (let middleware of middlewares) {
              if (!res.writableEnded) {
                await this.processMiddleware(
                  middleware,
                  parsedRequest,
                  parsedResponse
                );
              }
            }
            if (!res.writableEnded) controller(parsedRequest, parsedResponse);
            match = true;
            break;
          }
        }
        if (!match) {
          res.statusCode = 404;
          res.end("Not found");
        }
      }
    }
  );

  private processMiddleware(
    middleware: middleware,
    req: IParsedRequest,
    res: IParsedResponse
  ): Promise<boolean> | undefined {
    if (!middleware) return;
    return new Promise((resolve) => {
      middleware(req, res, function () {
        resolve(true);
      });
    });
  }

  private registerRoute(
    route: string,
    method: method,
    callback: controller | middleware,
    controllerOrMiddleware: "controller" | "middleware"
  ): void {
    const controller =
      controllerOrMiddleware === "controller" ? callback : false;
    const middleware =
      controllerOrMiddleware === "middleware" ? callback : false;

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

  addMiddleware(route: string, method: method, middleware: middleware): void {
    if (this.routeTable[route] && this.routeTable[route][method]) {
      this.registerRoute(route, method, middleware, "middleware");
    } else {
      throw new Error("There is no such an endpoint registered!");
    }
  }

  addController(route: string, method: method, controller: controller): void {
    this.registerRoute(route, method, controller, "controller");
  }

  listen(port: number, cb: () => void) {
    this.server.listen(port, cb);
  }
}

export default () => {
  return new myServer();
};
