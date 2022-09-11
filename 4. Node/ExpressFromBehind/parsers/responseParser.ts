import { ServerResponse } from "http";
import { stringify } from "querystring";
import { IParsedResponse } from "../types";

export function responseParser(res: ServerResponse): IParsedResponse {
  const additives = {
    send: (message) => res.end(message),
    json: (data) => {
      res.setHeader("Content-Type", "application/json");
      res.end(JSON.stringify(data));
    },
    end: (message) => res.end(message),
  };
  const response: IParsedResponse = Object.assign(additives, res);
  return response;
}
