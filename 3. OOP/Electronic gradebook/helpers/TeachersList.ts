import { List } from "./List";
import { IList, ITeacher } from "../types";

export class TeachersList extends List<ITeacher> implements IList<ITeacher> {
  private static instance: IList<ITeacher>;

  private constructor() {
    super();
  }

  public static getInstance(): IList<ITeacher> {
    if (!this.instance) {
      this.instance = new TeachersList();
    }

    return this.instance;
  }
}
