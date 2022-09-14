"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Overlord = void 0;
const Operator_1 = require("../Operator/Operator");
const SatelliteHandler_1 = require("../helpers/ISatelliteHandler/SatelliteHandler");
const GroupHandler_1 = require("../helpers/IGroupHandler/GroupHandler");
class Overlord extends Operator_1.Operator {
    constructor(firstName, lastName) {
        super(firstName, lastName);
    }
    clearSatellitesList() {
        SatelliteHandler_1.SatelliteHandler.getInstance().clearSatellitesList();
    }
    clearGroupsList() {
        GroupHandler_1.GroupHandler.getInstance().clearGroupsList();
    }
    changeSatelliteStatus(satellite, value) {
        if (SatelliteHandler_1.SatelliteHandler.getInstance().findSatellite(satellite)) {
            satellite.changeProperty("satelliteStatus", value);
        }
        else
            throw new Error("There is no such a satellite!");
    }
    changeGroupStatus(group, value) {
        const list = GroupHandler_1.GroupHandler.getInstance().getGroupSatellitesList(group);
        list.forEach((element) => {
            const index = SatelliteHandler_1.SatelliteHandler.getInstance().listOfSatellites.findIndex((satellite) => satellite.uuid === element);
            this.changeSatelliteStatus(SatelliteHandler_1.SatelliteHandler.getInstance().listOfSatellites[index], value);
        });
    }
    changeSystemStatus(value) {
        if (SatelliteHandler_1.SatelliteHandler.getInstance().listOfSatellites.length > 0) {
            SatelliteHandler_1.SatelliteHandler.getInstance().listOfSatellites.forEach((satellite) => {
                this.changeSatelliteStatus(satellite, value);
            });
        }
        else
            throw new Error("List of satellites is empty!");
    }
}
exports.Overlord = Overlord;
