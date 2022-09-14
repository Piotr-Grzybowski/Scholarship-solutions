"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SatelliteHandler = void 0;
const getIndex_1 = require("../getIndex");
class SatelliteHandler {
    constructor() {
        this.listOfSatellites = [];
    }
    static getInstance() {
        if (!SatelliteHandler.instance) {
            SatelliteHandler.instance = new SatelliteHandler();
        }
        return SatelliteHandler.instance;
    }
    addSatellite(satellite) {
        if (!this.findSatellite(satellite))
            this.listOfSatellites.push(satellite);
        else
            throw new Error("Satellite already exist!");
    }
    deleteSatellite(satellite) {
        if (this.findSatellite(satellite))
            this.listOfSatellites.splice((0, getIndex_1.getIndex)(this.listOfSatellites, satellite), 1);
        else
            throw new Error("There is no such a satellite!");
    }
    findSatellite(satellite) {
        const index = (0, getIndex_1.getIndex)(this.listOfSatellites, satellite);
        if (index !== -1)
            return satellite;
        return false;
    }
    changePropertyValue(satellite, property, value) {
        const satelliteIndex = (0, getIndex_1.getIndex)(this.listOfSatellites, satellite);
        if (satelliteIndex !== -1)
            this.listOfSatellites[satelliteIndex].changeProperty(property, value);
        else
            throw new Error("There is no such a satellite!");
    }
    clearSatellitesList() {
        this.listOfSatellites = [];
    }
}
exports.SatelliteHandler = SatelliteHandler;
