"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Absences = void 0;
const getIndex_1 = require("../utils/getIndex");
class Absences {
    constructor() {
        this.absencesList = [];
    }
    static getInstance() {
        if (!this.instance) {
            this.instance = new Absences();
        }
        return this.instance;
    }
    showAllAbsences() {
        return this.absencesList;
    }
    showAbsencesOfStudent(student) {
        const indexOfStudent = (0, getIndex_1.getIndex)(this.absencesList, student);
        if (indexOfStudent !== -1) {
            return this.absencesList[indexOfStudent].listOfElements;
        }
        return [];
    }
    addAbsence(student, absence) {
        const indexOfStudent = (0, getIndex_1.getIndex)(this.absencesList, student);
        if (indexOfStudent !== -1) {
            this.absencesList[indexOfStudent].listOfElements.push(Object.assign(Object.assign({}, absence), { excused: false }));
        }
        else {
            this.absencesList.push({
                idOfUser: student.uuid,
                listOfElements: [Object.assign(Object.assign({}, absence), { excused: false })],
            });
        }
    }
    excuseTheAbsence(student, absence) {
        const indexOfStudent = (0, getIndex_1.getIndex)(this.absencesList, student);
        if (indexOfStudent !== -1) {
            const searchedAbsence = this.absencesList[indexOfStudent].listOfElements.find((element) => element.dateOfAbsence === absence.dateOfAbsence);
            if (searchedAbsence !== undefined) {
                searchedAbsence.excused = true;
            }
            else
                throw new Error("There is no such an absence!");
        }
        else
            throw new Error("There is no such a student or student does not have any absences!");
    }
}
exports.Absences = Absences;
