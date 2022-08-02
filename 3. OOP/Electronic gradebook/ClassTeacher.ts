import { Teacher } from "./Teacher";
import {
  IParent,
  IStudent,
  IMessenger,
  IAbsences,
  IGrades,
  IClassTeacher,
  IList,
  ISingleton,
  message,
  ITeacher,
} from "./types";

export class ClassTeacher extends Teacher implements IClassTeacher {
  listOfTeachers: IList<ITeacher>;

  constructor(
    public name: string,
    public lastName: string,
    messenger: ISingleton<IMessenger>,
    absences: ISingleton<IAbsences>,
    grades: ISingleton<IGrades>,
    subjectTaught: string,
    listOfStudents: ISingleton<IList<IStudent>>,
    listOfParents: ISingleton<IList<IParent>>,
    listOfTeachers: ISingleton<IList<ITeacher>>
  ) {
    super(
      name,
      lastName,
      messenger,
      absences,
      grades,
      subjectTaught,
      listOfStudents,
      listOfParents
    );
    this.listOfTeachers = listOfTeachers.getInstance();
  }

  addStudent(student: IStudent): void {
    this.listOfStudents.addToTheList(student);
  }

  deleteStudent(student: IStudent): void {
    this.listOfStudents.deleteFromTheList(student);
  }

  addParent(parent: IParent): void {
    this.listOfParents.addToTheList(parent);
  }

  deleteParent(parent: IParent): void {
    this.listOfParents.deleteFromTheList(parent);
  }

  getListOfTeachers(): ITeacher[] {
    return this.listOfTeachers.showTheList();
  }

  findTeacher(teacher: ITeacher): false | ITeacher {
    return this.listOfTeachers.find(teacher);
  }

  addTeacher(teacher: ITeacher): void {
    this.listOfTeachers.addToTheList(teacher);
  }

  deleteTeacher(teacher: ITeacher): void {
    this.listOfTeachers.deleteFromTheList(teacher);
  }

  sendMessageToAllStudents(message: message): void {
    this.messenger.sendMessageToMany(
      this.listOfStudents.showTheList(),
      message
    );
  }

  sendMessageToAllParents(message: message): void {
    this.messenger.sendMessageToMany(this.listOfParents.showTheList(), message);
  }
}
