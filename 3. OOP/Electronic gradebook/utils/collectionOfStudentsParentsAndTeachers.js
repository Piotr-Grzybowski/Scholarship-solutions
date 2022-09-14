"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.classTeachers = exports.teachers = exports.parents = exports.students = void 0;
const Messenger_1 = require("../helpers/Messenger");
const Absences_1 = require("../helpers/Absences");
const Grades_1 = require("../helpers/Grades");
const StudentsList_1 = require("../helpers/StudentsList");
const ParentsList_1 = require("../helpers/ParentsList");
const TeachersList_1 = require("../helpers/TeachersList");
const Student_1 = require("../Student");
const Parent_1 = require("../Parent");
const Teacher_1 = require("../Teacher");
const ClassTeacher_1 = require("../ClassTeacher");
exports.students = [
    new Student_1.Student("John", "Kennedy", Messenger_1.Messenger, Absences_1.Absences, Grades_1.Grades),
    new Student_1.Student("Jack", "Sawyer", Messenger_1.Messenger, Absences_1.Absences, Grades_1.Grades),
    new Student_1.Student("Tom", "Thumb", Messenger_1.Messenger, Absences_1.Absences, Grades_1.Grades),
];
exports.parents = [
    new Parent_1.Parent("Jill", "Kennedy", Messenger_1.Messenger, Absences_1.Absences, Grades_1.Grades, exports.students[0]),
    new Parent_1.Parent("Kim", "Sawyer", Messenger_1.Messenger, Absences_1.Absences, Grades_1.Grades, exports.students[1]),
    new Parent_1.Parent("Elon", "Thumb", Messenger_1.Messenger, Absences_1.Absences, Grades_1.Grades),
];
exports.teachers = [
    new Teacher_1.Teacher("Ken", "Thomson", Messenger_1.Messenger, Absences_1.Absences, Grades_1.Grades, "biology", StudentsList_1.StudentsList, ParentsList_1.ParentsList),
    new Teacher_1.Teacher("Boris", "Johnson", Messenger_1.Messenger, Absences_1.Absences, Grades_1.Grades, "history", StudentsList_1.StudentsList, ParentsList_1.ParentsList),
];
exports.classTeachers = [
    new ClassTeacher_1.ClassTeacher("Lenny", "Kravitz", Messenger_1.Messenger, Absences_1.Absences, Grades_1.Grades, "biology", StudentsList_1.StudentsList, ParentsList_1.ParentsList, TeachersList_1.TeachersList),
];
