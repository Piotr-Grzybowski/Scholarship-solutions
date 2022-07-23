import {
  changeableProperties,
  changeablePropertiesForOperator,
  changeableValues,
  ISatellite,
  ISatelliteHandler,
} from "../../types";
import { getIndex } from "../getIndex";

export class SatelliteHandler implements ISatelliteHandler {
  private static instance: SatelliteHandler;
  listOfSatellites: Array<ISatellite> = [];

  private constructor() {}

  public static getInstance(): SatelliteHandler {
    if (!SatelliteHandler.instance) {
      SatelliteHandler.instance = new SatelliteHandler();
    }

    return SatelliteHandler.instance;
  }

  addSatellite(satellite: ISatellite): void {
    if (!this.findSatellite(satellite)) this.listOfSatellites.push(satellite);
    else throw new Error("Satellite already exist!");
  }
  deleteSatellite(satellite: ISatellite): void {
    if (this.findSatellite(satellite))
      this.listOfSatellites.splice(
        getIndex(this.listOfSatellites, satellite),
        1
      );
    else throw new Error("There is no such a satellite!");
  }
  findSatellite(satellite: ISatellite): false | ISatellite {
    const index = getIndex(this.listOfSatellites, satellite);
    if (index !== -1) return satellite;
    return false;
  }
  changePropertyValue(
    satellite: ISatellite,
    property: changeablePropertiesForOperator,
    value: changeableValues
  ): void {
    const satelliteIndex = getIndex(this.listOfSatellites, satellite);
    if (satelliteIndex !== -1)
      this.listOfSatellites[satelliteIndex].changeProperty(property, value);
    else throw new Error("There is no such a satellite!");
  }
  clearSatellitesList(): void {
    this.listOfSatellites = [];
  }
}
