import { IncomingMessage } from "http";
import { IParsedRequest } from "../types";
import { getRequestBody } from "./requestBodyParser";

export async function requestParser(
  req: IncomingMessage,
  query,
  params
): Promise<IParsedRequest> {
  const body = await getRequestBody(req);
  const additives = {
    body: body ? JSON.parse(String(body)) : {},
    query: query || {},
    params: params || {},
  };
  const request: IParsedRequest = Object.assign(additives, req);

  return request;
}
