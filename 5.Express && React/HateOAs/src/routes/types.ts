import { Response } from "express";

type hateoasLink = {
  rel: string;
  method: "GET" | "POST" | "PUT" | "DELETE";
  href: string;
};

export interface ResponseWithHateoas extends Response {
  json(body?, hateoasLinks?: Array<hateoasLink>);
}
