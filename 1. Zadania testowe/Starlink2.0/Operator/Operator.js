"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Operator = void 0;
const uuid_1 = require("uuid");
const SatelliteHandler_1 = require("../helpers/ISatelliteHandler/SatelliteHandler");
class Operator {
    // class hierarchy
    constructor(firstName, lastName) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.uuid = uuid_1.v4();
    }
    addSatellite(satellite) {
        SatelliteHandler_1.SatelliteHandler.getInstance().addSatellite() -  > [123];
        SatelliteHandler_1.SatelliteHandler.getInstance().addSatellite()[123, 321];
        this.satelliteHandler.addSatellite(satellite);
    }
    deleteSatellite(satellite) {
        this.satelliteHandler.deleteSatellite(satellite);
        this.groupHandler.deleteSatelliteFromAllGroups(satellite);
    }
    findSatellite(satellite) {
        return this.satelliteHandler.findSatellite(satellite);
    }
    addGroup(group) {
        this.groupHandler.addGroup(group);
    }
    deleteGroup(group) {
        this.groupHandler.deleteGroup(group);
    }
    changeGroupName(group, name) {
        this.groupHandler.changeGroupName(group, name);
    }
    findGroup(group) {
        return this.groupHandler.findGroup(group);
    }
    addSatelliteToTheGroup(group, satellite) {
        this.groupHandler.addSatelliteToTheGroup(group, satellite);
    }
    deleteSatelliteFromGroup(group, satellite) {
        this.groupHandler.deleteSatelliteFromGroup(group, satellite);
    }
    findSatelliteInGroup(group, satellite) {
        return this.groupHandler.findSatelliteInGroup(group, satellite);
    }
    changePropertyValueForSatellite(satellite, property, value) {
        this.satelliteHandler.changePropertyValue(satellite, property, value);
    }
    changePropertyValueForGroup(group, property, value) {
        const list = this.groupHandler.getGroupSatellitesList(group);
        list.forEach(element => {
            const index = this.satelliteHandler.listOfSatellites.findIndex(satellite => satellite.uuid === element);
            this.satelliteHandler.changePropertyValue(this.satelliteHandler.listOfSatellites[index], property, value);
        });
    }
    generateSatellitesListForGroup(group) {
        const list = this.groupHandler.getGroupSatellitesList(group);
        let satellitesList = [];
        list.forEach(element => {
            const index = this.satelliteHandler.listOfSatellites.findIndex(satellite => satellite.uuid === element);
            satellitesList.push(this.satelliteHandler.listOfSatellites[index]);
        });
        return satellitesList;
    }
}
exports.Operator = Operator;
