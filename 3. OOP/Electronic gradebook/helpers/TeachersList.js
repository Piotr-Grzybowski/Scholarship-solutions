"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TeachersList = void 0;
const List_1 = require("./List");
class TeachersList extends List_1.List {
    constructor() {
        super();
    }
    static getInstance() {
        if (!this.instance) {
            this.instance = new TeachersList();
        }
        return this.instance;
    }
}
exports.TeachersList = TeachersList;
