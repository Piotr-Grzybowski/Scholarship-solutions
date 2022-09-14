"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getIndex = void 0;
function getIndex(listOfUsers, user) {
    return listOfUsers.findIndex((element) => element.idOfUser === user.uuid);
}
exports.getIndex = getIndex;
