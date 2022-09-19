import { User } from "../user/user.interface";
import { Message } from "../message.interface";

export interface BasicChannel {
  name: string;
  messages: Message[];
  users: User[];
}
