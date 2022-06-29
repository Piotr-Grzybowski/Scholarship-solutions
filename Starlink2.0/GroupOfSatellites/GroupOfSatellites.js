"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GroupOfSatellites = void 0;
var uuid_1 = require("uuid");
var getIndex_1 = require("../helpers/getIndex");
var GroupOfSatellites = /** @class */ (function () {
    function GroupOfSatellites(groupName, listOfSatellites) {
        this.uuid = uuid_1.v4();
        this.groupName = groupName;
        this.listOfSatellites = listOfSatellites;
    }
    GroupOfSatellites.prototype.addSatellite = function (satellite) {
        if (!this.findSatellite(satellite))
            this.listOfSatellites.push(satellite.uuid);
        else
            throw new Error("Satellite is already in this group!");
    };
    GroupOfSatellites.prototype.deleteSatellite = function (satellite) {
        if (this.findSatellite(satellite))
            this.listOfSatellites.splice(getIndex_1.getIndex(this.listOfSatellites, satellite.uuid), 1);
        else
            throw new Error("There is no such satellite in this group!");
    };
    GroupOfSatellites.prototype.findSatellite = function (satellite) {
        var index = getIndex_1.getIndex(this.listOfSatellites, satellite.uuid);
        if (index !== -1)
            return satellite;
        return false;
    };
    GroupOfSatellites.prototype.changeGroupName = function (name) {
        if (name.length > 3)
            this.groupName = name;
        else
            throw new Error("Group name has to be longer than 3 characters!");
    };
    return GroupOfSatellites;
}());
exports.GroupOfSatellites = GroupOfSatellites;
