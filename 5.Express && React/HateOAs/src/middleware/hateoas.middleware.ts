import { Request, Response, NextFunction } from "express";

function hateoasLinker(req: Request, res: Response, next: NextFunction) {
  const originalJson = res.json;

  // @ts-ignore
  res.json = function (object, links) {
    res.json = originalJson;
    if (links.length === 0) {
      res.json(object);
      return;
    }
    const newObject = {
      ...object,
      _links: links,
    };

    res.json(newObject);
  };
  next();
}

export default hateoasLinker;
