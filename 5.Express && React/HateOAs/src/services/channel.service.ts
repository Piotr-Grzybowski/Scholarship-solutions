import { Channel } from "../interfaces/channel/channel.interface";
import { db } from "../db/launch";
import { uuid } from "uuidv4";
import { BasicChannel } from "../interfaces/channel/basicChannel.interface";

export const findAll = async (userId: string) => {
  const result = await db.getObject<Channel[]>("/" + userId + "/" + "channels");
  return result;
};

export const findChannel = async (userId: string, channelId: string) => {
  const index = await db.getIndex(`/${userId}/channels`, channelId);
  if (index !== -1) {
    const channel = await db.getObject<Channel>(
      `/${userId}/channels[${index}]`
    );
    return channel;
  }
};

export const addChannel = async (userId: string, channel: BasicChannel) => {
  const id = uuid();
  await db.push(`/${userId}/channels[]`, { ...channel, id: id });
  return;
};

export const deleteChannel = async (userId: string, channelId: string) => {
  const index = await db.getIndex(`/${userId}/channels`, channelId);
  if (index !== -1) {
    await db.delete(`/${userId}/channels[${index}]`);
    return;
  }
};

export const editChannel = async (
  userId: string,
  channelId: string,
  channel: BasicChannel
) => {
  const index = await db.getIndex(`/${userId}/channels`, channelId);
  if (index !== -1) {
    await db.push(`/${userId}/channels[${index}]`, channel);
  }
};
