import { Person } from "./Person";
import {
  IParent,
  IStudent,
  IMessenger,
  IAbsences,
  IGrades,
  ITeacher,
  IList,
  ISingleton,
  message,
  grade,
  absence,
} from "./types";

export class Teacher extends Person implements ITeacher {
  subjectTaught: string;
  listOfStudents: IList<IStudent>;
  listOfParents: IList<IParent>;

  constructor(
    public name: string,
    public lastName: string,
    messenger: ISingleton<IMessenger>,
    absences: ISingleton<IAbsences>,
    grades: ISingleton<IGrades>,
    subjectTaught: string,
    listOfStudents: ISingleton<IList<IStudent>>,
    listOfParents: ISingleton<IList<IParent>>
  ) {
    super(name, lastName, messenger, absences, grades);
    this.subjectTaught = subjectTaught;
    this.listOfStudents = listOfStudents.getInstance();
    this.listOfParents = listOfParents.getInstance();
  }

  findStudent(student: IStudent): IStudent | false {
    return this.listOfStudents.find(student);
  }

  findParent(parent: IParent): IParent | false {
    return this.listOfParents.find(parent);
  }

  getListOfStudents(): IStudent[] {
    return this.listOfStudents.showTheList();
  }

  getListOfParents(): IParent[] {
    return this.listOfParents.showTheList();
  }

  addGradeToStudent(student: IStudent, grade: grade) {
    this.grades.addGradeToStudent(student, grade);
  }

  addAbsenceToStudent(student: IStudent, absence: absence) {
    this.absences.addAbsence(student, absence);
  }

  sendMessageToParent(parent: IParent, message: message) {
    this.messenger.sendMessage(parent, message);
  }

  sendMessageToStudent(student: IStudent, message: message) {
    this.messenger.sendMessage(student, message);
  }
}
