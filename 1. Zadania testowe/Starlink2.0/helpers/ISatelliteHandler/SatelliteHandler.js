"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SatelliteHandler = void 0;
var getIndex_1 = require("../getIndex");
var SatelliteHandler = /** @class */ (function () {
    function SatelliteHandler(listOfSatellites) {
        this.listOfSatellites = listOfSatellites;
    }
    SatelliteHandler.prototype.addSatellite = function (satellite) {
        if (!this.findSatellite(satellite))
            this.listOfSatellites.push(satellite);
        else
            throw new Error("Satellite already exist!");
    };
    SatelliteHandler.prototype.deleteSatellite = function (satellite) {
        if (this.findSatellite(satellite))
            this.listOfSatellites.splice(getIndex_1.getIndex(this.listOfSatellites, satellite), 1);
        else
            throw new Error("There is no such a satellite!");
    };
    SatelliteHandler.prototype.findSatellite = function (satellite) {
        var index = getIndex_1.getIndex(this.listOfSatellites, satellite);
        if (index !== -1)
            return satellite;
        return false;
    };
    SatelliteHandler.prototype.changePropertyValue = function (satellite, property, value) {
        var satelliteIndex = getIndex_1.getIndex(this.listOfSatellites, satellite);
        if (satelliteIndex !== -1)
            this.listOfSatellites[satelliteIndex].changeProperty(property, value);
        else
            throw new Error("There is no such a satellite!");
    };
    return SatelliteHandler;
}());
exports.SatelliteHandler = SatelliteHandler;
