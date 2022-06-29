"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Satellite = void 0;
var uuid_1 = require("uuid");
var Satellite = /** @class */ (function () {
    function Satellite(altitude, coordinates, solarSail, signalBroadcast, satelliteStatus) {
        this.altitude = altitude;
        this.coordinates = coordinates;
        this.solarSail = solarSail;
        this.signalBroadcast = signalBroadcast;
        this.satelliteStatus = satelliteStatus;
        this.uuid = uuid_1.v4();
    }
    Satellite.prototype.changeProperty = function (propertyName, value) {
        var solved;
        switch (propertyName) {
            case 'altitude': {
                if (typeof value === 'number') {
                    this[propertyName] = value;
                    solved = true;
                }
                break;
            }
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
    };
    return Satellite;
}());
exports.Satellite = Satellite;
