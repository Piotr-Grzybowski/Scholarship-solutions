"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Student = void 0;
const Person_1 = require("./Person");
class Student extends Person_1.Person {
    constructor(name, lastName, messenger, absences, grades, parent = "") {
        super(name, lastName, messenger, absences, grades);
        this.name = name;
        this.lastName = lastName;
        this._parent = parent;
    }
    showMyGrades() {
        return this.grades.showGradesOfStudent(this);
    }
    showMyAbsences() {
        return this.absences.showAbsencesOfStudent(this);
    }
    get parent() {
        return this._parent;
    }
    set parent(newParent) {
        this._parent = newParent;
    }
}
exports.Student = Student;
