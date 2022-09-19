import { Channel } from "../channel/channel.interface";

export interface BasicUser {
  name: string;
  role: "Student" | "Mentor" | "Programmer";
  channelsList: Channel[];
}
