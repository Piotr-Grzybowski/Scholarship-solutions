import { db } from "./launch";
import { v4 } from "uuid";

export const idOfuser1 = v4();
export const idOfuser2 = v4();
const idOfChannel1 = v4();
export const idOfChannel2 = v4();

export const user1 = {
  id: idOfuser1,
  name: "John",
  role: "Student",
  channels: [],
};
export const user2 = {
  id: idOfuser2,
  name: "Jimmy",
  role: "Mentor",
  channels: [],
};
export const channel1 = {
  id: idOfChannel1,
  name: "nice channel",
  messages: [],
  users: [],
};
export const channel2 = {
  id: idOfChannel2,
  name: "nicer channel",
  messages: [],
  users: [],
};

export async function prepareDB() {
  await db.push("/users[]", user1);
  await db.push("/users[]", user2);
  // await db.push(`/${idOfuser1}/channels[]`, channel1);
  // await db.push(`/${idOfuser1}/channels[]`, channel2);
}

export async function removeTestingEntities() {
  const indexUser1 = await db.getIndex("/users", idOfuser1);
  await db.delete(`/users[${indexUser1}]`);
  const indexUser2 = await db.getIndex("/users", idOfuser2);
  await db.delete(`/users[${indexUser2}]`);
}

export async function addChannelsToUserOne() {
  const indexUser1 = await db.getIndex("/users", idOfuser1);
  await db.push(`/users[${indexUser1}]/channels[]`, channel1);
  await db.push(`/users[${indexUser1}]/channels[]`, channel2);
}
