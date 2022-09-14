"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Parent = void 0;
const Person_1 = require("./Person");
class Parent extends Person_1.Person {
    constructor(name, lastName, messenger, absences, grades, child = "") {
        super(name, lastName, messenger, absences, grades);
        this._child = child;
    }
    showChildAbsences() {
        if (this.child !== "") {
            return this.absences.showAbsencesOfStudent(this.child);
        }
        else
            throw new Error("There is no child assigned to this parent!");
    }
    showChildGrades() {
        if (this.child !== "") {
            return this.grades.showGradesOfStudent(this.child);
        }
        else
            throw new Error("There is no child assigned to this parent!");
    }
    excuseTheAbsence(absence) {
        if (this.child !== "") {
            this.absences.excuseTheAbsence(this.child, absence);
        }
        else
            throw new Error("There is no child assigned to this parent!");
    }
    get child() {
        return this._child;
    }
    set child(newChild) {
        this._child = newChild;
    }
}
exports.Parent = Parent;
