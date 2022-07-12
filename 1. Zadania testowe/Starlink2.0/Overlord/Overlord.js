"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.Overlord = void 0;
var Operator_1 = require("../Operator/Operator");
var Overlord = /** @class */ (function (_super) {
    __extends(Overlord, _super);
    function Overlord(firstName, lastName) {
        return _super.call(this, firstName, lastName) || this;
    }
    Overlord.prototype.changeSatelliteStatus = function (satellite, value) {
        if (this.satelliteHandler.findSatellite(satellite)) {
            satellite.changeProperty('satelliteStatus', value);
        }
        else
            throw new Error("There is no such a satellite!");
    };
    Overlord.prototype.changeGroupStatus = function (group, value) {
        var _this = this;
        var list = this.groupHandler.getGroupSatellitesList(group);
        list.forEach(function (element) {
            var index = _this.satelliteHandler.listOfSatellites.findIndex(function (satellite) { return satellite.uuid === element; });
            _this.changeSatelliteStatus(_this.satelliteHandler.listOfSatellites[index], value);
        });
    };
    Overlord.prototype.changeSystemStatus = function (value) {
        var _this = this;
        if (this.satelliteHandler.listOfSatellites.length !== 0) {
            this.satelliteHandler.listOfSatellites.forEach(function (satellite) {
                _this.changeSatelliteStatus(satellite, value);
            });
        }
        else
            throw new Error("List of satellites is empty!");
    };
    return Overlord;
}(Operator_1.Operator));
exports.Overlord = Overlord;
