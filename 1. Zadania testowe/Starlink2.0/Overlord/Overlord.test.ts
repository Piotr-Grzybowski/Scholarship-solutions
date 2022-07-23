import { Overlord } from "./Overlord";
import { GroupOfSatellites } from "../GroupOfSatellites/GroupOfSatellites";
import { Satellite } from "../Satellite/Satellite";
import { IGroup, ISatellite, IOverlord } from "../types";

describe("Overlord class ", () => {
  let overlord: IOverlord;
  let group1: IGroup;
  let group2: IGroup;
  let satellite1: ISatellite;
  let satellite2: ISatellite;
  beforeEach(() => {
    overlord = new Overlord("John", "Kendedy");
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
  /*
  Class Overlord should have the same functionality as Operator so first we do the same tests as we do for Operator to confirm that
  */
  describe("should work the same like operator", () => {
    it("should have proper fields and empty satellite and groups list", () => {
      expect(overlord.firstName).toBe("John");
      expect(overlord.lastName).toBe("Kendedy");
      expect(overlord.findGroup(group1)).toBe(false);
      expect(overlord.findSatellite(satellite1)).toBe(false);
    });
    it("should add group and satellite to the group", () => {
      overlord.addGroup(group1);
      overlord.addSatellite(satellite1);
      overlord.addSatelliteToTheGroup(group1, satellite1);
      expect(overlord.findGroup(group1)).toBe(group1);
      expect(overlord.findSatellite(satellite1)).toBe(satellite1);
      expect(overlord.findSatelliteInGroup(group1, satellite1)).toBe(
        satellite1
      );
    });
    it("should change name of the group", () => {
      overlord.addGroup(group1);
      expect(group1.groupName).toBe("satties");
      overlord.changeGroupName(group1, "cool satties");
      expect(group1.groupName).toBe("cool satties");
    });
    it("should change properties for a satellite", () => {
      overlord.addGroup(group1);
      overlord.addSatellite(satellite1);
      overlord.changePropertyValueForSatellite(satellite1, "altitude", 1000);
      overlord.changePropertyValueForSatellite(satellite1, "coordinates", {
        latitude: 1000,
        longitude: 1000,
      });
      overlord.changePropertyValueForSatellite(satellite1, "solarSail", "off");
      overlord.changePropertyValueForSatellite(
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
      overlord.addGroup(group1);
      overlord.addSatellite(satellite1);
      overlord.addSatellite(satellite2);
      overlord.addSatelliteToTheGroup(group1, satellite1);
      overlord.addSatelliteToTheGroup(group1, satellite2);
      overlord.changePropertyValueForGroup(group1, "altitude", 5000);
      overlord.changePropertyValueForGroup(group1, "coordinates", {
        latitude: 5000,
        longitude: 5000,
      });
      overlord.changePropertyValueForGroup(group1, "solarSail", "off");
      overlord.changePropertyValueForGroup(group1, "signalBroadcast", "on");
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
      overlord.addGroup(group1);
      overlord.addSatellite(satellite1);
      overlord.addSatellite(satellite2);
      overlord.addSatelliteToTheGroup(group1, satellite1);
      overlord.addSatelliteToTheGroup(group1, satellite2);
      expect(overlord.generateSatellitesListForGroup(group1)).toEqual(
        expect.arrayContaining([satellite1, satellite2])
      );
    });
  });
  describe("Overlord methods", () => {
    it("should turn off and on satellite", () => {
      expect(satellite2.satelliteStatus).toBe("on");
      overlord.addSatellite(satellite2);
      overlord.changeSatelliteStatus(satellite2, "off");
      expect(satellite2.satelliteStatus).toBe("off");
      overlord.changeSatelliteStatus(satellite2, "on");
      expect(satellite2.satelliteStatus).toBe("on");
    });
    it("should turn off and on group od satellites", () => {
      overlord.addSatellite(satellite1);
      overlord.addSatellite(satellite2);
      overlord.addGroup(group1);
      overlord.addSatelliteToTheGroup(group1, satellite1);
      overlord.addSatelliteToTheGroup(group1, satellite2);
      overlord.changeGroupStatus(group1, "off");
      expect(satellite1.satelliteStatus).toBe("off");
      expect(satellite1.satelliteStatus).toBe("off");
      overlord.changeGroupStatus(group1, "on");
      expect(satellite1.satelliteStatus).toBe("on");
      expect(satellite1.satelliteStatus).toBe("on");
    });
    it("should turn on and off all satellites", () => {
      overlord.addSatellite(satellite1);
      overlord.addSatellite(satellite2);
      overlord.changeSystemStatus("off");
      expect(satellite1.satelliteStatus).toBe("off");
      expect(satellite1.satelliteStatus).toBe("off");
      overlord.changeSystemStatus("on");
      expect(satellite1.satelliteStatus).toBe("on");
      expect(satellite1.satelliteStatus).toBe("on");
    });
    it("should throw when wrong satellite", () => {
      overlord.clearSatellitesList();
      overlord.clearGroupsList();
      expect(() =>
        overlord.changeSatelliteStatus(satellite2, "off")
      ).toThrowError("There is no such a satellite!");
      expect(() => overlord.changeGroupStatus(group1, "off")).toThrowError(
        "There is no such a group!"
      );
      expect(() => overlord.changeSystemStatus("off")).toThrowError(
        "List of satellites is empty!"
      );
    });
  });
});
