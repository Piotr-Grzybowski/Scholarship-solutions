import { Student } from "./Student";
import {
  absence,
  grade,
  IClassTeacher,
  IGradeBook,
  IParent,
  IStudent,
  ITeacher,
  listOfElements,
  message,
} from "./types";

export class GradeBook implements IGradeBook {
  classTeacher: IClassTeacher;

  constructor(classTeacher: IClassTeacher) {
    this.classTeacher = classTeacher;
  }

  getAbsencesList(): listOfElements<absence>[] {
    return this.classTeacher.absences.showAllAbsences();
  }

  getAbsencesOfStudent(student: IStudent): absence[] {
    return this.classTeacher.absences.showAbsencesOfStudent(student);
  }

  addAbsenceToStudent(student: IStudent, absence: absence): void {
    this.classTeacher.absences.addAbsence(student, absence);
  }

  getGradesOfStudent(student: IStudent): grade[] {
    return this.classTeacher.grades.showGradesOfStudent(student);
  }

  addGradeToStudent(student: IStudent, grade: grade): void {
    this.classTeacher.grades.addGradeToStudent(student, grade);
  }

  getListOfStudents(): Array<IStudent> {
    return this.classTeacher.getListOfStudents();
  }

  addStudent(student: IStudent): void {
    this.classTeacher.addStudent(student);
  }

  deleteStudent(student: IStudent): void {
    this.classTeacher.deleteStudent(student);
  }

  findStudent(student: IStudent): false | IStudent {
    return this.classTeacher.findStudent(student);
  }

  getListOfParents(): Array<IParent> {
    return this.classTeacher.getListOfParents();
  }

  addParent(parent: IParent): void {
    this.classTeacher.addParent(parent);
  }

  deleteParent(parent: IParent): void {
    this.classTeacher.deleteParent(parent);
  }

  findParent(parent: IParent): false | IParent {
    return this.classTeacher.findParent(parent);
  }

  getListOfTeachers(): ITeacher[] {
    return this.classTeacher.getListOfTeachers();
  }

  addTeacher(teacher: ITeacher): void {
    this.classTeacher.addTeacher(teacher);
  }

  deleteTeacher(teacher: ITeacher): void {
    this.classTeacher.deleteTeacher(teacher);
  }

  findTeacher(teacher: ITeacher): false | ITeacher {
    return this.classTeacher.findTeacher(teacher);
  }

  addParentToStudent(parent: IParent, student: IStudent): void {
    const searchedStudent = this.findStudent(student);
    if (searchedStudent) searchedStudent.parent = parent;
    else throw new Error("There is no such a student!");
  }

  addStudentToParent(student: IStudent, parent: IParent): void {
    const searchedParent = this.findParent(parent);
    if (searchedParent) searchedParent.child = student;
    else throw new Error("There is no such a parent!");
  }

  sendMessageToParent(parent: IParent, message: message): void {
    this.classTeacher.sendMessageToParent(parent, message);
  }

  sendMessageToStudent(student: IStudent, message: message): void {
    this.classTeacher.sendMessageToStudent(student, message);
  }

  sendMessageToTeacher(teacher: ITeacher, message: message): void {
    this.classTeacher.sendMessageToTeacher(teacher, message);
  }

  sendMessageToAllParents(message: message): void {
    this.classTeacher.sendMessageToAllParents(message);
  }

  sendMessageToAllStudents(message: message): void {
    this.classTeacher.sendMessageToAllStudents(message);
  }
}
