import { List } from "./List";
import { IList, IStudent } from "../types";

export class StudentsList extends List<IStudent> implements IList<IStudent> {
  private static instance: IList<IStudent>;

  private constructor() {
    super();
  }

  public static getInstance(): IList<IStudent> {
    if (!this.instance) {
      this.instance = new StudentsList();
    }

    return this.instance;
  }
}
