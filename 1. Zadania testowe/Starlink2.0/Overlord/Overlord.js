"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Overlord = void 0;
const Operator_1 = require("../Operator/Operator");
class Overlord extends Operator_1.Operator {
    constructor(firstName, lastName) {
        super(firstName, lastName);
    }
    changeSatelliteStatus(satellite, value) {
        if (this.satelliteHandler.findSatellite(satellite)) {
            satellite.changeProperty('satelliteStatus', value);
        }
        else
            throw new Error("There is no such a satellite!");
    }
    changeGroupStatus(group, value) {
        const list = this.groupHandler.getGroupSatellitesList(group);
        list.forEach(element => {
            const index = this.satelliteHandler.listOfSatellites.findIndex(satellite => satellite.uuid === element);
            this.changeSatelliteStatus(this.satelliteHandler.listOfSatellites[index], value);
        });
    }
    changeSystemStatus(value) {
        if (this.satelliteHandler.listOfSatellites.length === 0)
            throw new Error("List of satellites is empty!");
        this.satelliteHandler.listOfSatellites.forEach(satellite => {
            this.changeSatelliteStatus(satellite, value);
        });
    }
}
exports.Overlord = Overlord;
