import { IParsedResponse } from "../types";

export function responseParser(res: IParsedResponse): IParsedResponse {
  res.send = (message) => res.end(message);
  res.json = (data) => {
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify(data));
  };
  return res;
}
