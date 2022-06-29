import { Satellite } from "../../Satellite/Satellite";
import { GroupOfSatellites } from "../../GroupOfSatellites/GroupOfSatellites";
import { GroupHandler } from "./GroupHandler";
import { ISatellite, IGroup, IGroupHandler } from "../../types";

describe("Group handler helper class", () => {
  let satellite: ISatellite;
  let satellite2: ISatellite;
  let group: IGroup;
  let group2: IGroup;
  let handler: IGroupHandler;
  beforeEach(() => {
    satellite = new Satellite(
      13444,
      {
        latitude: 1221,
        longitude: 2131,
      },
      "on",
      "off",
      "on"
    );
    satellite2 = new Satellite(
      13444,
      {
        latitude: 1221,
        longitude: 2131,
      },
      "on",
      "off",
      "on"
    );
    group = new GroupOfSatellites("Awesome satties", []);
    group2 = new GroupOfSatellites("Cool satties", []);
    handler = new GroupHandler([]);
  });
  it("should create instance of class with proper values", () => {
    expect(handler.listOfGroups).toHaveLength(0);
    expect(handler.findGroup(group)).toBe(false);
  });
  it("all methods should work", () => {
    handler.addGroup(group);
    handler.addGroup(group2);
    expect(handler.findGroup(group)).toBe(group);
    expect(handler.findSatelliteInGroup(group, satellite)).toBe(false);

    handler.changeGroupName(group, "Just satties");
    handler.addSatelliteToTheGroup(group, satellite);
    expect(group.groupName).toBe("Just satties");
    expect(handler.findSatelliteInGroup(group, satellite)).toBe(satellite);

    handler.addSatelliteToTheGroup(group2, satellite);
    handler.deleteSatelliteFromAllGroups(satellite);
    expect(group.listOfSatellites).toHaveLength(0);
    expect(group2.listOfSatellites).toHaveLength(0);

    handler.addSatelliteToTheGroup(group2, satellite2);
    expect(handler.findSatelliteInGroup(group2, satellite2)).toBe(satellite2);
    handler.deleteSatelliteFromGroup(group2, satellite2);
    expect(group2.listOfSatellites).toHaveLength(0);
    expect(handler.findGroup(group)).toBe(group);

    handler.deleteGroup(group);
    expect(handler.findGroup(group)).toBe(false);
  });
  it("should throw proper errors", () => {
    handler.addGroup(group);
    expect(() => handler.addGroup(group)).toThrowError("Group already exist!");
    handler.deleteGroup(group);
    expect(() => handler.deleteGroup(group)).toThrowError(
      "There is no such a group!"
    );
    expect(() => handler.changeGroupName(group2, "boo")).toThrowError(
      "There is no such a group!"
    );
  });
});
