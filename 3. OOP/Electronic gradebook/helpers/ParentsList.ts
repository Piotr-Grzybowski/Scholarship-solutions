import { List } from "./List";
import { IList, IParent } from "../types";

export class ParentsList extends List<IParent> implements IList<IParent> {
  private static instance: IList<IParent>;

  private constructor() {
    super();
  }

  public static getInstance(): IList<IParent> {
    if (!this.instance) {
      this.instance = new ParentsList();
    }

    return this.instance;
  }
}
