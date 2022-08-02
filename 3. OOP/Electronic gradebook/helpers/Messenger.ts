import { IMessenger, listOfElements, message, IPerson } from "../types";
import { getIndex } from "../utils/getIndex";

export class Messenger implements IMessenger {
  private static instance: IMessenger;
  messagesList: Array<listOfElements<message>>;

  private constructor() {
    this.messagesList = [];
  }

  public static getInstance(): IMessenger {
    if (!this.instance) {
      this.instance = new Messenger();
    }

    return this.instance;
  }

  getMyMessages(person: IPerson): message[] {
    const indexOfUserInbox = getIndex(this.messagesList, person);
    if (indexOfUserInbox !== -1) {
      return this.messagesList[indexOfUserInbox].listOfElements;
    } else {
      return [];
    }
  }

  sendMessage(person: IPerson, message: message): void {
    const indexOfUserInbox = getIndex(this.messagesList, person);
    if (indexOfUserInbox !== -1) {
      this.messagesList[indexOfUserInbox].listOfElements.push({
        ...message,
        status: "unread",
      });
    } else {
      this.messagesList.push({
        idOfUser: person.uuid,
        listOfElements: [{ ...message, status: "unread" }],
      });
    }
  }

  sendMessageToMany(listOfPeople: Array<IPerson>, message: message): void {
    listOfPeople.forEach((student) => {
      this.sendMessage(student, message);
    });
  }
}
