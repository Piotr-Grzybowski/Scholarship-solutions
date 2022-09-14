"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Person = void 0;
const uuid_1 = require("uuid");
class Person {
    constructor(name, lastName, messenger, absences, grades) {
        this.name = name;
        this.lastName = lastName;
        this.uuid = (0, uuid_1.v4)();
        this.messenger = messenger.getInstance();
        this.absences = absences.getInstance();
        this.grades = grades.getInstance();
    }
    setMessenger() { }
    readMyMessages() {
        return this.messenger.getMyMessages(this);
    }
    sendMessageToTeacher(teacher, message) {
        this.messenger.sendMessage(teacher, message);
    }
}
exports.Person = Person;
