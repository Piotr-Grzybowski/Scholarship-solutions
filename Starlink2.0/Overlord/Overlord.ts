import { Operator } from "../Operator/Operator";
import { IGroup, IOverlord, ISatellite, onOff } from "../types";

export class Overlord extends Operator implements IOverlord {

  constructor(firstName: string, lastName: string) {
    super(firstName, lastName);
  }

  changeSatelliteStatus(satellite: ISatellite, value: onOff): void {
    if (this.satelliteHandler.findSatellite(satellite)) {
      satellite.changeProperty('satelliteStatus', value);
    }
    else throw new Error("There is no such a satellite!")
  }
  changeGroupStatus(group: IGroup, value: onOff): void {
    const list = this.groupHandler.getGroupSatellitesList(group);
    list.forEach(element => {
      const index = this.satelliteHandler.listOfSatellites.findIndex(satellite => satellite.uuid === element);
      this.changeSatelliteStatus(this.satelliteHandler.listOfSatellites[index], value);
    })
  }
  changeSystemStatus(value: onOff): void {
    this.satelliteHandler.listOfSatellites.forEach(satellite => {
      this.changeSatelliteStatus(satellite, value);
    })
  }
}