import { Person } from "./Person";
import {
  absence,
  grade,
  IAbsences,
  IGrades,
  IMessenger,
  IParent,
  ISingleton,
  IStudent,
} from "./types";

export class Parent extends Person implements IParent {
  _child: IStudent | "";

  constructor(
    name: string,
    lastName: string,
    absences: ISingleton<IAbsences>,
    grades: ISingleton<IGrades>,
    child: IStudent | "" = ""
  ) {
    super(name, lastName, messenger, absences, grades);
    this._child = child;
  }

  showChildAbsences(): absence[] {
    if (this.child !== "") {
      return this.absences.showAbsencesOfStudent(this.child);
    } else throw new Error("There is no child assigned to this parent!");
  }

  showChildGrades(): grade[] {
    if (this.child !== "") {
      return this.grades.showGradesOfStudent(this.child);
    } else throw new Error("There is no child assigned to this parent!");
  }

  excuseTheAbsence(absence: absence): void {
    if (this.child !== "") {
      this.absences.excuseTheAbsence(this.child, absence);
    } else throw new Error("There is no child assigned to this parent!");
  }

  get child() {
    return this._child;
  }

  set child(newChild) {
    this._child = newChild;
  }
}
