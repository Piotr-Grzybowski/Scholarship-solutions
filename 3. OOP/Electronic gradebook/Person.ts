import {
  IAbsences,
  IGrades,
  IMessenger,
  IPerson,
  ISingleton,
  ITeacher,
  message,
} from "./types";
import { v4 as uuidv4 } from "uuid";

export class Person implements IPerson {
  readonly uuid;
  messenger: IMessenger;
  absences: IAbsences;
  grades: IGrades;

  constructor(
    public name: string,
    public lastName: string,
    messenger: ISingleton<IMessenger>,
    absences: ISingleton<IAbsences>,
    grades: ISingleton<IGrades>
  ) {
    this.uuid = uuidv4();
    this.messenger = messenger.getInstance();
    this.absences = absences.getInstance();
    this.grades = grades.getInstance();
  }

  readMyMessages(): message[] {
    return this.messenger.getMyMessages(this);
  }

  sendMessageToTeacher(teacher: ITeacher, message: message) {
    this.messenger.sendMessage(teacher, message);
  }
}
