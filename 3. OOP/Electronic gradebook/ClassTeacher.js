"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClassTeacher = void 0;
const Teacher_1 = require("./Teacher");
class ClassTeacher extends Teacher_1.Teacher {
    constructor(name, lastName, messenger, absences, grades, subjectTaught, listOfStudents, listOfParents, listOfTeachers) {
        super(name, lastName, messenger, absences, grades, subjectTaught, listOfStudents, listOfParents);
        this.name = name;
        this.lastName = lastName;
        this.listOfTeachers = listOfTeachers.getInstance();
    }
    addStudent(student) {
        this.listOfStudents.addToTheList(student);
    }
    deleteStudent(student) {
        this.listOfStudents.deleteFromTheList(student);
    }
    addParent(parent) {
        this.listOfParents.addToTheList(parent);
    }
    deleteParent(parent) {
        this.listOfParents.deleteFromTheList(parent);
    }
    getListOfTeachers() {
        return this.listOfTeachers.showTheList();
    }
    findTeacher(teacher) {
        return this.listOfTeachers.find(teacher);
    }
    addTeacher(teacher) {
        this.listOfTeachers.addToTheList(teacher);
    }
    deleteTeacher(teacher) {
        this.listOfTeachers.deleteFromTheList(teacher);
    }
    sendMessageToAllStudents(message) {
        this.messenger.sendMessageToMany(this.listOfStudents.showTheList(), message);
    }
    sendMessageToAllParents(message) {
        this.messenger.sendMessageToMany(this.listOfParents.showTheList(), message);
    }
}
exports.ClassTeacher = ClassTeacher;
