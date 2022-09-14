"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StudentsList = void 0;
const List_1 = require("./List");
class StudentsList extends List_1.List {
    constructor() {
        super();
    }
    static getInstance() {
        if (!this.instance) {
            this.instance = new StudentsList();
        }
        return this.instance;
    }
}
exports.StudentsList = StudentsList;
