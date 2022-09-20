import { Channel } from "../interfaces/channel/channel.interface";
import { db } from "../db/launch";
import { uuid } from "uuidv4";
import { BasicChannel } from "../interfaces/channel/basicChannel.interface";

export const findAll = async (userId: string) => {
  const indexOfUser = await db.getIndex(`/users`, userId);
  const result = await db.getObject<Channel[]>(
    `/users[${indexOfUser}]/channels`
  );
  return result;
};

export const findChannel = async (userId: string, channelId: string) => {
  const indexOfUser = await db.getIndex(`/users`, userId);
  const index = await db.getIndex(`/users[${indexOfUser}]/channels`, channelId);
  if (index !== -1) {
    const channel = await db.getObject<Channel>(
      `/users[${indexOfUser}]/channels[${index}]`
    );
    return channel;
  }
};

export const addChannel = async (userId: string, channel: BasicChannel) => {
  const indexOfUser = await db.getIndex(`/users`, userId);
  const id = uuid();
  await db.push(`/users[${indexOfUser}]/channels[]`, { ...channel, id: id });
  return { ...channel, id: id };
};

export const deleteChannel = async (userId: string, channelId: string) => {
  const indexOfUser = await db.getIndex(`/users`, userId);
  const index = await db.getIndex(`/users[${indexOfUser}]/channels`, channelId);
  if (index !== -1) {
    await db.delete(`/users[${indexOfUser}]/channels[${index}]`);
    return;
  }
};

export const editChannel = async (
  userId: string,
  channelId: string,
  channel: BasicChannel
) => {
  const indexOfUser = await db.getIndex(`/users`, userId);
  const index = await db.getIndex(`/users[${indexOfUser}]/channels`, channelId);
  if (index !== -1) {
    await db.push(`/users[${indexOfUser}}]/channels[${index}]`, channel);
  }
};
