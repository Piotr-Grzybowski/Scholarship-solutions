// types
type listOfMessages = {
  idOfUser: IPerson["uuid"];
  messages: Array<message>;
};

type message = {
  title: string;
  body: string;
  status: "read" | "unread";
};

type grade = {
  subject: string;
  grade: string;
};

type listOfGrades = {
  idOfStudent: IStudent["uuid"];
  grades: Array<grade>;
};

type absence = {
  dateOdAbsence: string;
  excused: boolean;
};

type listOfAbsences = {
  idOfStudent: IStudent["uuid"];
  listOfAbsences: Array<absence>;
};

// interfaces
interface IPerson {
  uuid: string;
  name: string;
  lastName: string;
  messenger: IMessenger;
  absences: IAbsences;
  grades: IGrades;
  readMyMessages(): Array<message>;
  sendMessageToTeacher(teacher: ITeacher, message: message);
}

interface IStudent extends IPerson {
  parent: IParent;
  showMyGrades();
  showMyAbsences();
}

interface IParent extends IPerson {
  child: IStudent;
  showChildGrades();
  showChildAbsences();
  excuseTheAbsence();
}

interface ITeacher extends IPerson {
  subjectTaught: string;
  listOfStudents: IStudentsList;
  listOfParents: IParentsList;
  findStudent(student): IStudent;
  findParent(parent): IParent;
  getListOfStudents(): Array<IStudent>;
  getListOfParents(): Array<IParent>;
  addNoteToStudent(student: IStudent);
  addAbsenceToStudent(student: IStudent);
  sendMessageToParent(parent: IParent, message: message);
}

interface IClassTeacher extends ITeacher {
  listOfTeachers: ITeachersList;
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

interface IGradeBook {
  classTeacher: IClassTeacher;
  listOfStudents: IStudentsList;
  listOfParents: IParentsList;
  // use classTeacher methods
  getAbsencesList();
  addStudent(student: IStudent): void;
  deleteStudent(student: IStudent): void;
  findStudent(student: IStudent): IStudent | false;
  addParent(parent: IParent): void;
  deleteParent(parent: IParent): void;
  findParent(parent: IParent): IParent | false;
  listTeachers(): Array<ITeacher>;
  addTeacher(teacher: ITeacher): void;
  deleteTeacher(teacher: ITeacher): void;
  findTeacher(teacher: ITeacher): ITeacher | false;
  // use listOfStudents and listOfParents methods
  addParentToStudent(parent: IParent, student: IStudent): void;
  addStudentToParent(student: IStudent, parent: IParent): void;
}

// Singleton
interface IMessenger {
  messagesList: Array<listOfMessages>;
  getMessages(user: IPerson): Array<message>;
  sendMessageToParent(parent: IParent, message: message): void;
  sendMessageToTeacher(teacher: ITeacher, message: message): void;
  sendMessageToStudent(student: IStudent, message: message): void;
}

// Singleton
interface IGrades {
  gradesList: Array<listOfGrades>;
  showAllGrades(): Array<listOfGrades>;
  addGradeToStudent(student: IStudent): void;
  getGradesOfStudent(student: IStudent): Array<grade>;
}

// Singleton
interface IAbsences {
  absencesList: Array<listOfAbsences>;
  showListOfAbsences(): Array<listOfAbsences>;
  excuseTheAbsence(student: IStudent, parent: IParent);
}

// Singleton
interface IStudentsList {
  studentsList: Array<IStudent>;
  showListOfStudents(): Array<IStudent>;
  add(student: IStudent): void;
  delete(student: IStudent): void;
}

// Singleton
interface IParentsList {
  parentsList: Array<IParent>;
  showListOfParents(): Array<IParent>;
  add(parent: IParent): void;
  delete(parent: IParent): void;
}

//Singleton
interface ITeachersList {
  teachersList: Array<ITeacher>;
  showListOfTeachers(): Array<ITeacher>;
  add(teacher: ITeacher): void;
  delete(teacher: ITeacher): void;
}
