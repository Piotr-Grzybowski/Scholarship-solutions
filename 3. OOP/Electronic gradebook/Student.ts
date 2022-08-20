import { Person } from "./Person";
import {
  IParent,
  IStudent,
  IMessenger,
  IAbsences,
  IGrades,
  grade,
  absence,
  ISingleton,
} from "./types";

export class Student extends Person implements IStudent {
  _parent: IParent | "";

  constructor(
    public name: string,
    public lastName: string,
    messenger: ISingleton<IMessenger>,
    absences: ISingleton<IAbsences>,
    grades: ISingleton<IGrades>,
    parent: IParent | "" = ""
  ) {
    super(name, lastName, messenger, absences, grades);
    this._parent = parent;
  }

  showMyGrades(): grade[] {
    return this.grades.showGradesOfStudent(this);
  }

  showMyAbsences(): absence[] {
    return this.absences.showAbsencesOfStudent(this);
  }

  get parent() {
    return this._parent;
  }

  set parent(newParent) {
    this._parent = newParent;
  }
}
