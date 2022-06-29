import { Operator } from "./Operator";
import { GroupOfSatellites } from "../GroupOfSatellites/GroupOfSatellites";
import { Satelite } from "../Satellite/Satellite";
import { IGroup, ISatellite, IOperator } from "../types";

describe("Operator class ", () => {
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
    it("satellites methods", () => {});
  });
});
