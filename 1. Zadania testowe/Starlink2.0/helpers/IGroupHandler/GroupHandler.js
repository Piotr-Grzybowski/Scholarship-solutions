"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GroupHandler = void 0;
const getIndex_1 = require("../getIndex");
class GroupHandler {
    constructor(listOfGroups) {
        this.listOfGroups = listOfGroups;
    }
    addGroup(group) {
        if (!this.findGroup(group))
            this.listOfGroups.push(group);
        else
            throw new Error("Group already exist!");
    }
    deleteGroup(group) {
        if (this.checkIfGroupExist(group)) {
            const index = getIndex_1.getIndex(this.listOfGroups, group);
            this.listOfGroups.splice(index, 1);
        }
    }
    findGroup(group) {
        const index = getIndex_1.getIndex(this.listOfGroups, group);
        if (index !== -1)
            return group;
        return false;
    }
    addSatelliteToTheGroup(group, satellite) {
        if (this.checkIfGroupExist(group)) {
            const groupIndex = getIndex_1.getIndex(this.listOfGroups, group);
            this.listOfGroups[groupIndex].addSatellite(satellite);
        }
    }
    deleteSatelliteFromGroup(group, satellite) {
        if (this.checkIfGroupExist(group)) {
            const groupIndex = getIndex_1.getIndex(this.listOfGroups, group);
            this.listOfGroups[groupIndex].deleteSatellite(satellite);
        }
    }
    deleteSatelliteFromAllGroups(satellite) {
        this.listOfGroups.forEach(group => {
            if (group.findSatellite(satellite)) {
                const index = getIndex_1.getIndex(group.listOfSatellites, satellite.uuid);
                group.listOfSatellites.splice(index, 1);
            }
        });
    }
    findSatelliteInGroup(group, satellite) {
        if (this.checkIfGroupExist(group)) {
            const groupIndex = getIndex_1.getIndex(this.listOfGroups, group);
            return this.listOfGroups[groupIndex].findSatellite(satellite);
        }
        return false;
    }
    changeGroupName(group, name) {
        if (this.checkIfGroupExist(group)) {
            const groupIndex = getIndex_1.getIndex(this.listOfGroups, group);
            this.listOfGroups[groupIndex].changeGroupName(name);
        }
    }
    getGroupSatellitesList(group) {
        if (this.checkIfGroupExist(group)) {
            const index = getIndex_1.getIndex(this.listOfGroups, group);
            return this.listOfGroups[index].listOfSatellites;
        }
        return [];
    }
    checkIfGroupExist(group) {
        if (getIndex_1.getIndex(this.listOfGroups, group) !== -1)
            return true;
        throw new Error("There is no such a group!");
    }
}
exports.GroupHandler = GroupHandler;
