"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GroupOfSatellites = void 0;
const uuid_1 = require("uuid");
const getIndex_1 = require("../helpers/getIndex");
class GroupOfSatellites {
    constructor(groupName, listOfSatellites) {
        this.uuid = uuid_1.v4();
        this.groupName = groupName;
        this.listOfSatellites = listOfSatellites;
    }
    addSatellite(satellite) {
        if (!this.findSatellite(satellite))
            this.listOfSatellites.push(satellite.uuid);
        else
            throw new Error("Satellite is already in this group!");
    }
    deleteSatellite(satellite) {
        if (this.findSatellite(satellite))
            this.listOfSatellites.splice(getIndex_1.getIndex(this.listOfSatellites, satellite.uuid), 1);
        else
            throw new Error("There is no such satellite in this group!");
    }
    findSatellite(satellite) {
        const index = getIndex_1.getIndex(this.listOfSatellites, satellite.uuid);
        if (index !== -1)
            return satellite;
        return false;
    }
    changeGroupName(name) {
        if (name.length > 3)
            this.groupName = name;
        else
            throw new Error("Group name has to be longer than 3 characters!");
    }
}
exports.GroupOfSatellites = GroupOfSatellites;
