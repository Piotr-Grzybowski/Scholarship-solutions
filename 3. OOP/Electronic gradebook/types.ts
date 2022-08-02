// types
export type listOfElements<T> = {
  idOfUser: IPerson["uuid"];
  listOfElements: Array<T>;
};

export type message = {
  title: string;
  body: string;
  status?: "read" | "unread";
};

export type grade = {
  subject: string;
  grade: string;
};

export type absence = {
  dateOfAbsence: string;
  excused?: boolean;
};

// interfaces
export interface IPerson {
  uuid: string;
  name: string;
  lastName: string;
  messenger: IMessenger;
  absences: IAbsences;
  grades: IGrades;
  readMyMessages(): Array<message>;
  sendMessageToTeacher(teacher: ITeacher, message: message);
}

export interface IStudent extends IPerson {
  parent: IParent | "";
  showMyGrades(): Array<grade>;
  showMyAbsences(): Array<absence>;
}

export interface IParent extends IPerson {
  child: IStudent | "";
  showChildGrades(): Array<grade>;
  showChildAbsences(): Array<absence>;
  excuseTheAbsence(absence: absence): void;
}

export interface ITeacher extends IPerson {
  subjectTaught: string;
  listOfStudents: IList<IStudent>;
  listOfParents: IList<IParent>;
  findStudent(student: IStudent): IStudent | false;
  findParent(parent: IParent): IParent | false;
  getListOfStudents(): Array<IStudent>;
  getListOfParents(): Array<IParent>;
  addGradeToStudent(student: IStudent, grade: grade);
  addAbsenceToStudent(student: IStudent, absence: absence);
  sendMessageToParent(parent: IParent, message: message);
  sendMessageToStudent(student: IStudent, message: message);
}

export interface IClassTeacher extends ITeacher {
  listOfTeachers: IList<ITeacher>;
  addStudent(student: IStudent): void;
  deleteStudent(student: IStudent): void;
  addParent(parent: IParent): void;
  deleteParent(parent: IParent): void;
  getListOfTeachers(): Array<ITeacher>;
  findTeacher(teacher: ITeacher): ITeacher | false;
  addTeacher(teacher: ITeacher): void;
  deleteTeacher(teacher: ITeacher): void;
  sendMessageToAllStudents(message: message): void;
  sendMessageToAllParents(message: message): void;
}

export interface IGradeBook {
  classTeacher: IClassTeacher;
  getAbsencesList(): Array<listOfElements<absence>>;
  getAbsencesOfStudent(student: IStudent): Array<absence>;
  addAbsenceToStudent(student: IStudent, absence: absence): void;
  getGradesOfStudent(student: IStudent): Array<grade>;
  addGradeToStudent(student: IStudent, grade: grade): void;
  getListOfStudents(): Array<IStudent>;
  addStudent(student: IStudent): void;
  deleteStudent(student: IStudent): void;
  findStudent(student: IStudent): IStudent | false;
  getListOfParents(): Array<IParent>;
  addParent(parent: IParent): void;
  deleteParent(parent: IParent): void;
  findParent(parent: IParent): IParent | false;
  getListOfTeachers(): Array<ITeacher>;
  addTeacher(teacher: ITeacher): void;
  deleteTeacher(teacher: ITeacher): void;
  findTeacher(teacher: ITeacher): ITeacher | false;
  addParentToStudent(parent: IParent, student: IStudent): void;
  addStudentToParent(student: IStudent, parent: IParent): void;
  sendMessageToParent(parent: IParent, message: message): void;
  sendMessageToStudent(student: IStudent, message: message): void;
  sendMessageToTeacher(teacher: ITeacher, message: message): void;
  sendMessageToAllParents(message: message): void;
  sendMessageToAllStudents(message: message): void;
}

// Singleton
export interface IMessenger {
  messagesList: Array<listOfElements<message>>;
  getMyMessages(person: IPerson): Array<message>;
  sendMessage(person: IPerson, message: message): void;
  sendMessageToMany(listOfPeople: Array<IPerson>, message): void;
}

// Singleton
export interface IGrades {
  gradesList: Array<listOfElements<grade>>;
  showAllGrades(): Array<listOfElements<grade>>;
  addGradeToStudent(student: IStudent, grade: grade): void;
  showGradesOfStudent(student: IStudent): Array<grade>;
}

// Singleton
export interface IAbsences {
  absencesList: Array<listOfElements<absence>>;
  showAllAbsences(): Array<listOfElements<absence>>;
  showAbsencesOfStudent(student: IStudent): Array<absence>;
  addAbsence(student: IStudent, absence: absence);
  excuseTheAbsence(student: IStudent, absence: absence);
}

export interface IList<T> {
  list: Array<T>;
  showTheList(): Array<T>;
  addToTheList(element: T): void;
  deleteFromTheList(element: T): void;
  find(element: T): T | false;
}

export interface ISingleton<T> {
  getInstance(): T;
}

// // Singleton
// export interface IStudentsList extends IList<IStudent> {
//   studentsList: Array<IStudent>;
//   showListOfStudents(): Array<IStudent>;
//   add(student: IStudent): void;
//   delete(student: IStudent): void;
// }

// // Singleton
// export interface IParentsList extends IList<IParent> {
//   parentsList: Array<IParent>;
//   showListOfParents(): Array<IParent>;
//   add(parent: IParent): void;
//   delete(parent: IParent): void;
// }

// //Singleton
// export interface ITeachersList extends IList<ITeacher> {
//   teachersList: Array<ITeacher>;
//   showListOfTeachers(): Array<ITeacher>;
//   add(teacher: ITeacher): void;
//   delete(teacher: ITeacher): void;
// }
