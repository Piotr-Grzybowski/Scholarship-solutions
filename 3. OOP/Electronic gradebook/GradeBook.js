"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GradeBook = void 0;
// Person
// type = "ClassTeacher" | Teacher | Student | Parent
// grantAccesstype = 1 | 1 | 2 | 3
class GradeBook {
    constructor(classTeacher) {
        this.classTeacher = classTeacher;
    }
    getAbsencesList() {
        return this.classTeacher.absences.showAllAbsences();
    }
    getAbsencesOfStudent(student) {
        return this.classTeacher.absences.showAbsencesOfStudent(student);
    }
    addAbsenceToStudent(
    // actionCallerId: string,
    student, absence) {
        // const user = this.users.findById(actionCallerId);
        // UsersMap.get(actionCallerId)
        // if (user.grantType < 2) throw new Error("wyjazd");
        this.classTeacher.absences.addAbsence(student, absence);
    }
    getGradesOfStudent(student) {
        return this.classTeacher.grades.showGradesOfStudent(student);
    }
    addGradeToStudent(student, grade) {
        this.classTeacher.grades.addGradeToStudent(student, grade);
    }
    getListOfStudents() {
        return this.classTeacher.getListOfStudents();
    }
    addStudent(student) {
        this.classTeacher.addStudent(student);
    }
    deleteStudent(student) {
        this.classTeacher.deleteStudent(student);
    }
    findStudent(student) {
        return this.classTeacher.findStudent(student);
    }
    getListOfParents() {
        return this.classTeacher.getListOfParents();
    }
    addParent(parent) {
        this.classTeacher.addParent(parent);
    }
    deleteParent(parent) {
        this.classTeacher.deleteParent(parent);
    }
    findParent(parent) {
        return this.classTeacher.findParent(parent);
    }
    getListOfTeachers() {
        return this.classTeacher.getListOfTeachers();
    }
    addTeacher(teacher) {
        this.classTeacher.addTeacher(teacher);
    }
    deleteTeacher(teacher) {
        this.classTeacher.deleteTeacher(teacher);
    }
    findTeacher(teacher) {
        return this.classTeacher.findTeacher(teacher);
    }
    addParentToStudent(parent, student) {
        const searchedStudent = this.findStudent(student);
        if (searchedStudent)
            searchedStudent.parent = parent;
        else
            throw new Error("There is no such a student!");
    }
    addStudentToParent(student, parent) {
        const searchedParent = this.findParent(parent);
        if (searchedParent)
            searchedParent.child = student;
        else
            throw new Error("There is no such a parent!");
    }
    sendMessageToParent(parent, message) {
        this.classTeacher.sendMessageToParent(parent, message);
    }
    sendMessageToStudent(student, message) {
        this.classTeacher.sendMessageToStudent(student, message);
    }
    sendMessageToTeacher(teacher, message) {
        this.classTeacher.sendMessageToTeacher(teacher, message);
    }
    sendMessageToAllParents(message) {
        this.classTeacher.sendMessageToAllParents(message);
    }
    sendMessageToAllStudents(message) {
        this.classTeacher.sendMessageToAllStudents(message);
    }
}
exports.GradeBook = GradeBook;
