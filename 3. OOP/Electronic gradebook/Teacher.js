"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Teacher = void 0;
const Person_1 = require("./Person");
class Teacher extends Person_1.Person {
    constructor(name, lastName, messenger, absences, grades, subjectTaught, listOfStudents, listOfParents) {
        super(name, lastName, messenger, absences, grades);
        this.name = name;
        this.lastName = lastName;
        this.subjectTaught = subjectTaught;
        this.listOfStudents = listOfStudents.getInstance();
        this.listOfParents = listOfParents.getInstance();
    }
    findStudent(student) {
        return this.listOfStudents.find(student);
    }
    findParent(parent) {
        return this.listOfParents.find(parent);
    }
    getListOfStudents() {
        return this.listOfStudents.showTheList();
    }
    getListOfParents() {
        return this.listOfParents.showTheList();
    }
    addGradeToStudent(student, grade) {
        this.grades.addGradeToStudent(student, grade);
    }
    addAbsenceToStudent(student, absence) {
        this.absences.addAbsence(student, absence);
    }
    sendMessageToParent(parent, message) {
        this.messenger.sendMessage(parent, message);
    }
    sendMessageToStudent(student, message) {
        this.messenger.sendMessage(student, message);
    }
}
exports.Teacher = Teacher;
