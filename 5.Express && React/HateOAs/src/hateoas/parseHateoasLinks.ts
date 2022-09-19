import { routes } from "./routes";
import { Request } from "express";

export function parseHateoasLinks(req: Request) {
  let url = req.baseUrl + req.route.path;

  if (Object.keys(req.params).length > 0) {
    for (let param in req.params) {
      url = url.replace(req.params[param], ":" + param);
    }
  }
  return routes[url] || [];
}
