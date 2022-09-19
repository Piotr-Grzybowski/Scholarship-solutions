import { Channel } from "./channel/channel.interface";
import { User } from "./user/user.interface";

export interface Message {
  id: string;
  message: string;
  from: User;
  to: User;
  channel: Channel;
}
