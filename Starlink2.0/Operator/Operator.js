"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Operator = void 0;
var uuid_1 = require("uuid");
var SatelliteHandler_1 = require("../helpers/ISatelliteHandler/SatelliteHandler");
var GroupHandler_1 = require("../helpers/IGroupHandler/GroupHandler");
var Operator = /** @class */ (function () {
    function Operator(firstName, lastName) {
        this.satelliteHandler = new SatelliteHandler_1.SatelliteHandler([]);
        this.groupHandler = new GroupHandler_1.GroupHandler([]);
        this.firstName = firstName;
        this.lastName = lastName;
        this.uuid = uuid_1.v4();
    }
    Operator.prototype.addSatellite = function (satellite) {
        this.satelliteHandler.addSatellite(satellite);
    };
    Operator.prototype.deleteSatellite = function (satellite) {
        this.satelliteHandler.deleteSatellite(satellite);
        this.groupHandler.deleteSatelliteFromAllGroups(satellite);
    };
    Operator.prototype.findSatellite = function (satellite) {
        return this.satelliteHandler.findSatellite(satellite);
    };
    Operator.prototype.addGroup = function (group) {
        this.groupHandler.addGroup(group);
    };
    Operator.prototype.deleteGroup = function (group) {
        this.groupHandler.deleteGroup(group);
    };
    Operator.prototype.changeGroupName = function (group, name) {
        this.groupHandler.changeGroupName(group, name);
    };
    Operator.prototype.addSatelliteToTheGroup = function (group, satellite) {
        this.groupHandler.addSatelliteToTheGroup(group, satellite);
    };
    Operator.prototype.deleteSatelliteFromGroup = function (group, satellite) {
        this.groupHandler.deleteSatelliteFromGroup(group, satellite);
    };
    Operator.prototype.findSatelliteInGroup = function (group, satellite) {
        return this.groupHandler.findSatelliteInGroup(group, satellite);
    };
    Operator.prototype.changePropertyValueForSatellite = function (satellite, property, value) {
        this.satelliteHandler.changePropertyValue(satellite, property, value);
    };
    Operator.prototype.changePropertyValueForGroup = function (group, property, value) {
        var _this = this;
        var list = this.groupHandler.getGroupSatellitesList(group);
        list.forEach(function (element) {
            var index = _this.satelliteHandler.listOfSatellites.findIndex(function (satellite) { return satellite.uuid === element; });
            _this.satelliteHandler.changePropertyValue(_this.satelliteHandler.listOfSatellites[index], property, value);
        });
    };
    Operator.prototype.generateSatellitesListForGroup = function (group) {
        var _this = this;
        var list = this.groupHandler.getGroupSatellitesList(group);
        var satellitesList = [];
        list.forEach(function (element) {
            var index = _this.satelliteHandler.listOfSatellites.findIndex(function (satellite) { return satellite.uuid === element; });
            satellitesList.push(_this.satelliteHandler.listOfSatellites[index]);
        });
        return satellitesList;
    };
    return Operator;
}());
exports.Operator = Operator;
