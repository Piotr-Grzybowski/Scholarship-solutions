import { Satellite } from "../../Satellite/Satellite";
import { SatelliteHandler } from "./SatelliteHandler";
import { ISatellite, ISatelliteHandler } from "../../types";

describe("Satellite handler helper class", () => {
  let satellite: ISatellite;
  let handler: ISatelliteHandler;
  beforeEach(() => {
    const altitude = 13444;
    const coordinates = {
      latitude: 1212,
      longitude: 1214,
    };
    const solarSail = "on";
    const signalBroadcast = "off";
    const satelliteStatus = "on";
    satellite = new Satellite(
      altitude,
      coordinates,
      solarSail,
      signalBroadcast,
      satelliteStatus
    );
    handler = SatelliteHandler.getInstance();
  });
  it("should create instance of class with proper values", () => {
    expect(handler.listOfSatellites).toHaveLength(0);
    expect(handler.findSatellite(satellite)).toBe(false);
  });
  it("should add and delete satellite", () => {
    handler.addSatellite(satellite);
    expect(handler.findSatellite(satellite)).toBe(satellite);
    handler.deleteSatellite(satellite);
    expect(handler.findSatellite(satellite)).toBe(false);
  });
  it("should change properties of the satellite", () => {
    handler.addSatellite(satellite);
    handler.changePropertyValue(satellite, "altitude", 1000);
    handler.changePropertyValue(satellite, "coordinates", {
      latitude: 1000,
      longitude: 1000,
    });
    handler.changePropertyValue(satellite, "solarSail", "off");
    handler.changePropertyValue(satellite, "signalBroadcast", "on");
    expect(satellite.altitude).toBe(1000);
    expect(satellite.coordinates).toStrictEqual({
      latitude: 1000,
      longitude: 1000,
    });
    expect(satellite.solarSail).toBe("off");
    expect(satellite.signalBroadcast).toBe("on");
  });
  it("should throw proper errors", () => {
    handler.addSatellite(satellite);
    expect(() => handler.addSatellite(satellite)).toThrowError(
      "Satellite already exist!"
    );
    handler.deleteSatellite(satellite);
    expect(() => handler.deleteSatellite(satellite)).toThrowError(
      "There is no such a satellite!"
    );
    expect(() =>
      handler.changePropertyValue(satellite, "solarSail", "on")
    ).toThrowError("There is no such a satellite!");
  });
});
