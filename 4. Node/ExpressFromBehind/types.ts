import { IncomingMessage, ServerResponse } from "http";

export type middleware = (
  req: IParsedRequest,
  res: IParsedResponse,
  next: Function
) => void;

export type controller = (req: IParsedRequest, res: IParsedResponse) => void;

export type method = "get" | "post" | "put" | "delete";

export interface IParsedRequest extends IncomingMessage {
  query: {
    [index: string]: any;
  };
  params: {
    [index: string]: any;
  };
  body: {
    [index: string]: any;
  };
}

export interface IParsedResponse extends ServerResponse {
  json: (message: string | object) => void;
  send: (message: string | object) => void;
}
