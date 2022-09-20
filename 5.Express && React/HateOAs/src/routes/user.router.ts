import express, { Request } from "express";
import { BasicUser } from "../interfaces/user/basicUser.interface";
import { User } from "../interfaces/user/user.interface";
import * as UserService from "../services/user.service";
import { parseHateoasLinks } from "../hateoas/parseHateoasLinks";
import { ResponseWithHateoas } from "./types";

export const usersRouter = express.Router({ mergeParams: true });

usersRouter.get("/", async (req: Request, res: ResponseWithHateoas) => {
  try {
    const users: User[] = await UserService.findAll();
    res.status(200).json(users, parseHateoasLinks(req));
  } catch (err) {
    res.status(500).send(err.message);
  }
});

usersRouter.get("/:id", async (req: Request, res: ResponseWithHateoas) => {
  try {
    const id: string = req.params.id;
    const user: User = await UserService.findUser(id);
    res.status(200).json({ user }, parseHateoasLinks(req));
  } catch (err) {
    res.status(500).send(err.message);
  }
});

usersRouter.post("/", async (req: Request, res: ResponseWithHateoas) => {
  try {
    const user: BasicUser = req.body;
    await UserService.addUser(user);
    res.status(201).json(user, parseHateoasLinks(req));
  } catch (err) {
    res.status(500).send(err.message);
  }
});

usersRouter.put("/:id", async (req: Request, res: ResponseWithHateoas) => {
  try {
    const id: string = req.params.id;
    const user: BasicUser = req.body;
    await UserService.editUser(id, user);
    res.status(201).json(user, parseHateoasLinks(req));
  } catch (err) {
    res.status(500).send(err.message);
  }
});

usersRouter.delete("/:id", async (req: Request, res: ResponseWithHateoas) => {
  try {
    const id: string = req.params.id;
    const user: User = await UserService.findUser(id);
    await UserService.deleteUser(id);
    res.status(200).json(user, parseHateoasLinks(req));
  } catch (err) {
    res.status(500).send(err.message);
  }
});
