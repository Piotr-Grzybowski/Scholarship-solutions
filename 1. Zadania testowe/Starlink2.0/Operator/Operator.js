"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Operator = void 0;
const uuid_1 = require("uuid");
const SatelliteHandler_1 = require("../helpers/ISatelliteHandler/SatelliteHandler");
const GroupHandler_1 = require("../helpers/IGroupHandler/GroupHandler");
class Operator {
    // class hierarchy
    constructor(firstName, lastName) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.uuid = (0, uuid_1.v4)();
    }
    addSatellite(satellite) {
        SatelliteHandler_1.SatelliteHandler.getInstance().addSatellite(satellite);
    }
    deleteSatellite(satellite) {
        SatelliteHandler_1.SatelliteHandler.getInstance().deleteSatellite(satellite);
        GroupHandler_1.GroupHandler.getInstance().deleteSatelliteFromAllGroups(satellite);
    }
    findSatellite(satellite) {
        return SatelliteHandler_1.SatelliteHandler.getInstance().findSatellite(satellite);
    }
    addGroup(group) {
        GroupHandler_1.GroupHandler.getInstance().addGroup(group);
    }
    deleteGroup(group) {
        GroupHandler_1.GroupHandler.getInstance().deleteGroup(group);
    }
    changeGroupName(group, name) {
        GroupHandler_1.GroupHandler.getInstance().changeGroupName(group, name);
    }
    findGroup(group) {
        return GroupHandler_1.GroupHandler.getInstance().findGroup(group);
    }
    addSatelliteToTheGroup(group, satellite) {
        GroupHandler_1.GroupHandler.getInstance().addSatelliteToTheGroup(group, satellite);
    }
    deleteSatelliteFromGroup(group, satellite) {
        GroupHandler_1.GroupHandler.getInstance().deleteSatelliteFromGroup(group, satellite);
    }
    findSatelliteInGroup(group, satellite) {
        return GroupHandler_1.GroupHandler.getInstance().findSatelliteInGroup(group, satellite);
    }
    changePropertyValueForSatellite(satellite, property, value) {
        SatelliteHandler_1.SatelliteHandler.getInstance().changePropertyValue(satellite, property, value);
    }
    changePropertyValueForGroup(group, property, value) {
        const list = GroupHandler_1.GroupHandler.getInstance().getGroupSatellitesList(group);
        list.forEach((element) => {
            const index = SatelliteHandler_1.SatelliteHandler.getInstance().listOfSatellites.findIndex((satellite) => satellite.uuid === element);
            SatelliteHandler_1.SatelliteHandler.getInstance().changePropertyValue(SatelliteHandler_1.SatelliteHandler.getInstance().listOfSatellites[index], property, value);
        });
    }
    generateSatellitesListForGroup(group) {
        const list = GroupHandler_1.GroupHandler.getInstance().getGroupSatellitesList(group);
        let satellitesList = [];
        list.forEach((element) => {
            const index = SatelliteHandler_1.SatelliteHandler.getInstance().listOfSatellites.findIndex((satellite) => satellite.uuid === element);
            satellitesList.push(SatelliteHandler_1.SatelliteHandler.getInstance().listOfSatellites[index]);
        });
        return satellitesList;
    }
}
exports.Operator = Operator;
