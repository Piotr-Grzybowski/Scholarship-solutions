import { Operator } from "../Operator/Operator";
import { IGroup, IOverlord, ISatellite, onOff } from "../types";
import { SatelliteHandler } from "../helpers/ISatelliteHandler/SatelliteHandler";
import { GroupHandler } from "../helpers/IGroupHandler/GroupHandler";

export class Overlord extends Operator implements IOverlord {
  constructor(firstName: string, lastName: string) {
    super(firstName, lastName);
  }

  clearSatellitesList(): void {
    SatelliteHandler.getInstance().clearSatellitesList();
  }

  clearGroupsList(): void {
    GroupHandler.getInstance().clearGroupsList();
  }

  changeSatelliteStatus(satellite: ISatellite, value: onOff): void {
    if (SatelliteHandler.getInstance().findSatellite(satellite)) {
      satellite.changeProperty("satelliteStatus", value);
    } else throw new Error("There is no such a satellite!");
  }
  changeGroupStatus(group: IGroup, value: onOff): void {
    const list = GroupHandler.getInstance().getGroupSatellitesList(group);
    list.forEach((element) => {
      const index = SatelliteHandler.getInstance().listOfSatellites.findIndex(
        (satellite) => satellite.uuid === element
      );
      this.changeSatelliteStatus(
        SatelliteHandler.getInstance().listOfSatellites[index],
        value
      );
    });
  }
  changeSystemStatus(value: onOff): void {
    if (SatelliteHandler.getInstance().listOfSatellites.length > 0) {
      SatelliteHandler.getInstance().listOfSatellites.forEach((satellite) => {
        this.changeSatelliteStatus(satellite, value);
      });
    } else throw new Error("List of satellites is empty!");
  }
}
