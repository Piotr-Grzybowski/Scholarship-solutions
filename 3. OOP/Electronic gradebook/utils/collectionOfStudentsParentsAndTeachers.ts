import { IStudent, IParent, ITeacher, IClassTeacher } from "../types";
import { Messenger } from "../helpers/Messenger";
import { Absences } from "../helpers/Absences";
import { Grades } from "../helpers/Grades";
import { StudentsList } from "../helpers/StudentsList";
import { ParentsList } from "../helpers/ParentsList";
import { TeachersList } from "../helpers/TeachersList";
import { Student } from "../Student";
import { Parent } from "../Parent";
import { Teacher } from "../Teacher";
import { ClassTeacher } from "../ClassTeacher";

export const students: IStudent[] = [
  new Student("John", "Kennedy", Messenger, Absences, Grades),
  new Student("Jack", "Sawyer", Messenger, Absences, Grades),
  new Student("Tom", "Thumb", Messenger, Absences, Grades),
];

export const parents: IParent[] = [
  new Parent("Jill", "Kennedy", Messenger, Absences, Grades, students[0]),
  new Parent("Kim", "Sawyer", Messenger, Absences, Grades, students[1]),
  new Parent("Elon", "Thumb", Messenger, Absences, Grades),
];

export const teachers: ITeacher[] = [
  new Teacher(
    "Ken",
    "Thomson",
    Messenger,
    Absences,
    Grades,
    "biology",
    StudentsList,
    ParentsList
  ),
  new Teacher(
    "Boris",
    "Johnson",
    Messenger,
    Absences,
    Grades,
    "history",
    StudentsList,
    ParentsList
  ),
];

export const classTeachers: IClassTeacher[] = [
  new ClassTeacher(
    "Lenny",
    "Kravitz",
    Messenger,
    Absences,
    Grades,
    "biology",
    StudentsList,
    ParentsList,
    TeachersList
  ),
];
