import { Satellite } from "./Satellite";

describe("Satellite class", () => {
  // Create testable instance of satellite class
  const altitude = 13444;
  const coordinates = {
    latitude: 1212,
    longitude: 1214,
  };
  const solarSail = "on";
  const signalBroadcast = "off";
  const satelliteStatus = "on";
  const satellite = new Satellite(
    altitude,
    coordinates,
    solarSail,
    signalBroadcast,
    satelliteStatus
  );
  it("should create an object with proper values", () => {
    expect(satellite.altitude).toBe(altitude);
    expect(satellite.coordinates).toStrictEqual(coordinates);
    expect(satellite.solarSail).toBe(solarSail);
    expect(satellite.signalBroadcast).toBe(signalBroadcast);
    expect(satellite.satelliteStatus).toBe(satelliteStatus);
    expect(satellite.uuid).toBeDefined();
  });
  it("should change given values", () => {
    satellite.changeProperty("altitude", 2341);
    satellite.changeProperty("coordinates", {
      latitude: 1111,
      longitude: 2222,
    });
    satellite.changeProperty("solarSail", "off");
    satellite.changeProperty("signalBroadcast", "on");
    satellite.changeProperty("satelliteStatus", "off");
    expect(satellite.altitude).toBe(2341);
    expect(satellite.coordinates).toStrictEqual({
      latitude: 1111,
      longitude: 2222,
    });
    expect(satellite.solarSail).toBe("off");
    expect(satellite.signalBroadcast).toBe("on");
    expect(satellite.satelliteStatus).toBe("off");
  });
  it("should throw error when given data is not suitable for given property", () => {
    const spy = jest.spyOn(console, "log").mockImplementation();

    expect(() => satellite.changeProperty("altitude", "on")).toThrowError(
      "Wrong input data for property"
    );
  });
});
