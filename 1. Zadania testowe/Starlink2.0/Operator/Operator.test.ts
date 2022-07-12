import { Operator } from "./Operator";
import { GroupOfSatellites } from "../GroupOfSatellites/GroupOfSatellites";
import { Satellite } from "../Satellite/Satellite";
import { IGroup, ISatellite, IOperator } from "../types";

describe("testing Operator class ", () => {
  let operator: IOperator;
  let group1: IGroup;
  let group2: IGroup;
  let satellite1: ISatellite;
  let satellite2: ISatellite;
  beforeEach(() => {
    operator = new Operator("John", "Kendedy");
    group1 = new GroupOfSatellites("satties", []);
    group2 = new GroupOfSatellites("tvsatties", []);
    satellite1 = new Satellite(
      13444,
      {
        latitude: 1221,
        longitude: 2131,
      },
      "on",
      "off",
      "off"
    );
    satellite2 = new Satellite(
      10000,
      {
        latitude: 1000,
        longitude: 1000,
      },
      "off",
      "on",
      "on"
    );
  });
  describe("all methods should work as gold", () => {
    it("should have proper fields and empty satellite and groups list", () => {
      expect(operator.firstName).toBe("John");
      expect(operator.lastName).toBe("Kendedy");
      expect(operator.findGroup(group1)).toBe(false);
      expect(operator.findSatellite(satellite1)).toBe(false);
    });
    it("should add group and satellite to the group", () => {
      operator.addGroup(group1);
      operator.addSatellite(satellite1);
      operator.addSatelliteToTheGroup(group1, satellite1);
      expect(operator.findGroup(group1)).toBe(group1);
      expect(operator.findSatellite(satellite1)).toBe(satellite1);
      expect(operator.findSatelliteInGroup(group1, satellite1)).toBe(
        satellite1
      );
    });
    it("should change name of the group", () => {
      operator.addGroup(group1);
      expect(group1.groupName).toBe("satties");
      operator.changeGroupName(group1, "cool satties");
      expect(group1.groupName).toBe("cool satties");
    });
    it("should change properties for a satellite", () => {
      operator.addGroup(group1);
      operator.addSatellite(satellite1);
      operator.changePropertyValueForSatellite(satellite1, "altitude", 1000);
      operator.changePropertyValueForSatellite(satellite1, "coordinates", {
        latitude: 1000,
        longitude: 1000,
      });
      operator.changePropertyValueForSatellite(satellite1, "solarSail", "off");
      operator.changePropertyValueForSatellite(
        satellite1,
        "signalBroadcast",
        "on"
      );
      expect(satellite1.altitude).toBe(1000);
      expect(satellite1.coordinates).toStrictEqual({
        latitude: 1000,
        longitude: 1000,
      });
      expect(satellite1.solarSail).toBe("off");
      expect(satellite1.signalBroadcast).toBe("on");
    });
    it("should change properties for a group of satellites", () => {
      operator.addGroup(group1);
      operator.addSatellite(satellite1);
      operator.addSatellite(satellite2);
      operator.addSatelliteToTheGroup(group1, satellite1);
      operator.addSatelliteToTheGroup(group1, satellite2);
      operator.changePropertyValueForGroup(group1, "altitude", 5000);
      operator.changePropertyValueForGroup(group1, "coordinates", {
        latitude: 5000,
        longitude: 5000,
      });
      operator.changePropertyValueForGroup(group1, "solarSail", "off");
      operator.changePropertyValueForGroup(group1, "signalBroadcast", "on");
      expect(satellite1.altitude).toBe(5000);
      expect(satellite2.altitude).toBe(5000);
      expect(satellite1.coordinates).toStrictEqual({
        latitude: 5000,
        longitude: 5000,
      });
      expect(satellite2.coordinates).toStrictEqual({
        latitude: 5000,
        longitude: 5000,
      });
      expect(satellite1.solarSail).toBe("off");
      expect(satellite2.solarSail).toBe("off");
      expect(satellite1.signalBroadcast).toBe("on");
      expect(satellite2.signalBroadcast).toBe("on");
    });
    // In groups I only keep uuids of satellites, so to get full list of
    // satellites with all details I need seperate method
    it("should generate satellite list for group", () => {
      operator.addGroup(group1);
      operator.addSatellite(satellite1);
      operator.addSatellite(satellite2);
      operator.addSatelliteToTheGroup(group1, satellite1);
      operator.addSatelliteToTheGroup(group1, satellite2);
      expect(operator.generateSatellitesListForGroup(group1)).toEqual(
        expect.arrayContaining([satellite1, satellite2])
      );
    });
    /*
      class operator doesn't throw any errors by itself, it uses satellite and group handlers and throwing errors is already tested in thos classes
    */
  });
});
