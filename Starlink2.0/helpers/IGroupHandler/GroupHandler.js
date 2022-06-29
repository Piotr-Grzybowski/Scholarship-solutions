"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GroupHandler = void 0;
var getIndex_1 = require("../getIndex");
var GroupHandler = /** @class */ (function () {
    function GroupHandler(listOfGroups) {
        this.listOfGroups = listOfGroups;
    }
    GroupHandler.prototype.addGroup = function (group) {
        if (!this.findGroup(group))
            this.listOfGroups.push(group);
        else
            throw new Error("Group already exist!");
    };
    GroupHandler.prototype.deleteGroup = function (group) {
        if (this.checkIfGroupExist(group)) {
            var index = getIndex_1.getIndex(this.listOfGroups, group);
            this.listOfGroups.splice(index, 1);
        }
    };
    GroupHandler.prototype.findGroup = function (group) {
        var index = getIndex_1.getIndex(this.listOfGroups, group);
        if (index !== -1)
            return group;
        return false;
    };
    GroupHandler.prototype.addSatelliteToTheGroup = function (group, satellite) {
        if (this.checkIfGroupExist(group)) {
            var groupIndex = getIndex_1.getIndex(this.listOfGroups, group);
            this.listOfGroups[groupIndex].addSatellite(satellite);
        }
    };
    GroupHandler.prototype.deleteSatelliteFromGroup = function (group, satellite) {
        if (this.checkIfGroupExist(group)) {
            var groupIndex = getIndex_1.getIndex(this.listOfGroups, group);
            this.listOfGroups[groupIndex].deleteSatellite(satellite);
        }
    };
    GroupHandler.prototype.deleteSatelliteFromAllGroups = function (satellite) {
        this.listOfGroups.forEach(function (group) {
            if (group.findSatellite(satellite)) {
                var index = getIndex_1.getIndex(group.listOfSatellites, satellite.uuid);
                group.listOfSatellites.splice(index, 1);
            }
        });
    };
    GroupHandler.prototype.findSatelliteInGroup = function (group, satellite) {
        if (this.checkIfGroupExist(group)) {
            var groupIndex = getIndex_1.getIndex(this.listOfGroups, group);
            return this.listOfGroups[groupIndex].findSatellite(satellite);
        }
        return false;
    };
    GroupHandler.prototype.changeGroupName = function (group, name) {
        if (this.checkIfGroupExist(group)) {
            var groupIndex = getIndex_1.getIndex(this.listOfGroups, group);
            this.listOfGroups[groupIndex].changeGroupName(name);
        }
    };
    GroupHandler.prototype.getGroupSatellitesList = function (group) {
        if (this.checkIfGroupExist(group)) {
            var index = getIndex_1.getIndex(this.listOfGroups, group);
            return this.listOfGroups[index].listOfSatellites;
        }
        return [];
    };
    GroupHandler.prototype.checkIfGroupExist = function (group) {
        if (getIndex_1.getIndex(this.listOfGroups, group) !== -1)
            return true;
        throw new Error("There is no such a group!");
    };
    return GroupHandler;
}());
exports.GroupHandler = GroupHandler;
