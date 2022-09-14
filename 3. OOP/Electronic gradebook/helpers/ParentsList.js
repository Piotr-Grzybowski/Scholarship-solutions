"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ParentsList = void 0;
const List_1 = require("./List");
class ParentsList extends List_1.List {
    constructor() {
        super();
    }
    static getInstance() {
        if (!this.instance) {
            this.instance = new ParentsList();
        }
        return this.instance;
    }
}
exports.ParentsList = ParentsList;
