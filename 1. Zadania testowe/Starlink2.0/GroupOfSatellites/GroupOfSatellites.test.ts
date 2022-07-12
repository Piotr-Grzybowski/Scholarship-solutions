import { Satellite } from "../Satellite/Satellite";
import { GroupOfSatellites } from "./GroupOfSatellites";
import { ISatellite, IGroup } from "../types";

describe("Group of satellites class", () => {
  let satellite: ISatellite;
  let group: IGroup;
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
    group = new GroupOfSatellites("Awesome satties", []);
  });
  it("should create instance of class with proper values", () => {
    expect(group.groupName).toBe("Awesome satties");
    expect(group.uuid).toBeDefined();
    expect(group.listOfSatellites).toHaveLength(0);
    expect(group.findSatellite(satellite)).toBe(false);
  });
  it("all methods should work", () => {
    group.changeGroupName("Just satties");
    group.addSatellite(satellite);
    expect(group.groupName).toBe("Just satties");
    expect(group.findSatellite(satellite)).toBe(satellite);
    group.deleteSatellite(satellite);
    expect(group.findSatellite(satellite)).toBe(false);
  });
  it("should throw proper errors", () => {
    group.addSatellite(satellite);
    expect(() => group.addSatellite(satellite)).toThrowError(
      "Satellite is already in this group!"
    );
    group.deleteSatellite(satellite);
    expect(() => group.deleteSatellite(satellite)).toThrowError(
      "There is no such satellite in this group!"
    );
    expect(() => group.changeGroupName("boo")).toThrowError(
      "Group name has to be longer than 3 characters!"
    );
  });
});
