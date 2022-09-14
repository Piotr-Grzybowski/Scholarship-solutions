"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Grades = void 0;
const getIndex_1 = require("../utils/getIndex");
class Grades {
    constructor() {
        this.gradesList = [];
    }
    static getInstance() {
        if (!this.instance) {
            this.instance = new Grades();
        }
        return this.instance;
    }
    showAllGrades() {
        return this.gradesList;
    }
    addGradeToStudent(student, grade) {
        const indexOfStudent = (0, getIndex_1.getIndex)(this.gradesList, student);
        if (indexOfStudent !== -1) {
            this.gradesList[indexOfStudent].listOfElements.push(grade);
        }
        else {
            this.gradesList.push({
                idOfUser: student.uuid,
                listOfElements: [grade],
            });
        }
    }
    showGradesOfStudent(student) {
        const indexOfStudent = (0, getIndex_1.getIndex)(this.gradesList, student);
        if (indexOfStudent !== -1) {
            return this.gradesList[indexOfStudent].listOfElements;
        }
        return [];
    }
}
exports.Grades = Grades;
