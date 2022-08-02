import { IList } from "../types";

export class List<T> implements IList<T> {
  constructor(public list: Array<T> = []) {}

  showTheList(): Array<T> {
    return this.list;
  }

  addToTheList(person: T): void {
    if (!this.list.includes(person)) {
      this.list.push(person);
    } else throw new Error("Person already exist!");
  }

  deleteFromTheList(person: T): void {
    if (this.list.includes(person)) {
      const indexOfPerson = this.list.findIndex(
        (element) => element === person
      );
      this.list.splice(indexOfPerson, 1);
    } else throw new Error("Can't delete person that does not exist!");
  }

  find(person: T): T | false {
    const searchedPerson = this.list.find((element) => element === person);
    if (searchedPerson !== undefined) return searchedPerson;
    return false;
  }
}
