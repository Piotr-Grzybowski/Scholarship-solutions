import { User } from "../interfaces/user/user.interface";
import { BasicUser } from "../interfaces/user/basicUser.interface";
import { db } from "../db/launch";
import { uuid } from "uuidv4";

export const findAll = async () => {
  const result = await db.getObject<User[]>("/");
  return result;
};

export const findUser = async (userId: string) => {
  const index = await db.getIndex(`/users`, userId);
  if (index !== -1) {
    const user = await db.getObject<User>(`/users[${index}]`);
    return user;
  }
};

export const addUser = async (user: BasicUser) => {
  const id = uuid();
  await db.push("/users[]", { ...user, id: id });
};

export const deleteUser = async (userId: string) => {
  const index = await db.getIndex(`/users`, userId);
  if (index !== -1) {
    await db.delete(`/users[${index}]`);
    return;
  }
};

export const editUser = async (userId: string, user: BasicUser) => {
  const index = await db.getIndex(`/users`, userId);
  if (index !== -1) {
    await db.push(`/users[${index}]`, user);
    return;
  }
};
