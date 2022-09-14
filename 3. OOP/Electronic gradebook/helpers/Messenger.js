"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Messenger = void 0;
const getIndex_1 = require("../utils/getIndex");
class Messenger {
    constructor() {
        this.messagesList = [];
    }
    static getInstance() {
        if (!this.instance) {
            this.instance = new Messenger();
        }
        return this.instance;
    }
    getMyMessages(person) {
        const indexOfUserInbox = (0, getIndex_1.getIndex)(this.messagesList, person);
        if (indexOfUserInbox !== -1) {
            return this.messagesList[indexOfUserInbox].listOfElements;
        }
        return [];
    }
    sendMessage(person, message) {
        const indexOfUserInbox = (0, getIndex_1.getIndex)(this.messagesList, person);
        if (indexOfUserInbox !== -1) {
            this.messagesList[indexOfUserInbox].listOfElements.push(Object.assign(Object.assign({}, message), { status: "unread" }));
            return;
        }
        this.messagesList.push({
            idOfUser: person.uuid,
            listOfElements: [Object.assign(Object.assign({}, message), { status: "unread" })],
        });
    }
    sendMessageToMany(listOfPeople, message) {
        listOfPeople.forEach((student) => {
            this.sendMessage(student, message);
        });
    }
}
exports.Messenger = Messenger;
