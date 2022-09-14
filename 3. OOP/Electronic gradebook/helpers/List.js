"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.List = void 0;
class List {
    constructor(list = []) {
        this.list = list;
    }
    showTheList() {
        return this.list;
    }
    addToTheList(person) {
        if (!this.list.includes(person)) {
            this.list.push(person);
        }
        else
            throw new Error("Person already exist!");
    }
    deleteFromTheList(person) {
        if (this.list.includes(person)) {
            const indexOfPerson = this.list.findIndex((element) => element === person);
            this.list.splice(indexOfPerson, 1);
        }
        else
            throw new Error("Can't delete person that does not exist!");
    }
    find(person) {
        const searchedPerson = this.list.find((element) => element === person);
        if (searchedPerson !== undefined)
            return searchedPerson;
        return false;
    }
}
exports.List = List;
