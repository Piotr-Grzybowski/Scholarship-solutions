import { User } from "../interfaces/user/user.interface";
import { BasicUser } from "../interfaces/user/basicUser.interface";
import { db } from "../db/launch";
import { uuid } from "uuidv4";

export const findAll = async () => {
  const result = await db.getObject<User[]>("/");
  return result;
};

export const findUser = async (userId: string) => {
  const user = await db.getObject<User>("/" + userId);
  return user;
};

export const addUser = async (user: BasicUser) => {
  const id = uuid();
  await db.push("/" + id, { ...user, id: id });
};

export const deleteUser = async (userId: string) => {
  await db.delete("/" + userId);
  return;
};

export const editUser = async (userId: string, user: BasicUser) => {
  await db.push("/" + userId, user);
};
