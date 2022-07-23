"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Satellite = void 0;
const uuid_1 = require("uuid");
const changePropertyHandlers = {
    altitude: (value) => this.altitude = altitude
};
class Satellite {
    constructor(altitude, coordinates, solarSail, signalBroadcast, satelliteStatus) {
        this.altitude = altitude;
        this.coordinates = coordinates;
        this.solarSail = solarSail;
        this.signalBroadcast = signalBroadcast;
        this.satelliteStatus = satelliteStatus;
        this.uuid = uuid_1.v4();
    }
    changeProperty(propertyName, value) {
        let solved;
        switch (propertyName) {
            case 'altitude':
                {
                    changeAltitute(123);
                    solved = true;
                }
                break;
            case 'coordinates': {
                if (typeof value === 'object') {
                    if (value.hasOwnProperty('latitude') && value.hasOwnProperty('longitude')) {
                        this[propertyName] = value;
                        solved = true;
                    }
                }
                break;
            }
            default: {
                if (typeof value === 'string') {
                    if (value === 'on' || value === 'off') {
                        this[propertyName] = value;
                        solved = true;
                    }
                }
                break;
            }
        }
        if (!solved)
            throw new Error("Wrong input data for property");
    }
    changeAltitute(value) {
        this.altitude = value;
    }
}
exports.Satellite = Satellite;
