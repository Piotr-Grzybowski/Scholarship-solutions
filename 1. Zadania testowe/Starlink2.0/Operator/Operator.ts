import {
  changeablePropertiesForOperator,
  changeableValues,
  IGroup,
  IOperator,
  ISatellite,
} from "../types";
import { v4 as uuidv4 } from "uuid";
import { SatelliteHandler } from "../helpers/ISatelliteHandler/SatelliteHandler";
import { GroupHandler } from "../helpers/IGroupHandler/GroupHandler";

export class Operator implements IOperator {
  readonly uuid: string;
  firstName: string;
  lastName: string;
  // class hierarchy

  constructor(firstName: string, lastName: string) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.uuid = uuidv4();
  }

  addSatellite(satellite: ISatellite): void {
    SatelliteHandler.getInstance().addSatellite(satellite);
  }
  deleteSatellite(satellite: ISatellite): void {
    SatelliteHandler.getInstance().deleteSatellite(satellite);
    GroupHandler.getInstance().deleteSatelliteFromAllGroups(satellite);
  }
  findSatellite(satellite: ISatellite): false | ISatellite {
    return SatelliteHandler.getInstance().findSatellite(satellite);
  }
  addGroup(group: IGroup): void {
    GroupHandler.getInstance().addGroup(group);
  }
  deleteGroup(group: IGroup): void {
    GroupHandler.getInstance().deleteGroup(group);
  }
  changeGroupName(group: IGroup, name: string): void {
    GroupHandler.getInstance().changeGroupName(group, name);
  }
  findGroup(group: IGroup): false | IGroup {
    return GroupHandler.getInstance().findGroup(group);
  }
  addSatelliteToTheGroup(group: IGroup, satellite: ISatellite): void {
    GroupHandler.getInstance().addSatelliteToTheGroup(group, satellite);
  }
  deleteSatelliteFromGroup(group: IGroup, satellite: ISatellite): void {
    GroupHandler.getInstance().deleteSatelliteFromGroup(group, satellite);
  }
  findSatelliteInGroup(
    group: IGroup,
    satellite: ISatellite
  ): false | ISatellite {
    return GroupHandler.getInstance().findSatelliteInGroup(group, satellite);
  }
  changePropertyValueForSatellite(
    satellite: ISatellite,
    property: changeablePropertiesForOperator,
    value: changeableValues
  ): void {
    SatelliteHandler.getInstance().changePropertyValue(
      satellite,
      property,
      value
    );
  }
  changePropertyValueForGroup(
    group: IGroup,
    property: changeablePropertiesForOperator,
    value: changeableValues
  ): void {
    const list = GroupHandler.getInstance().getGroupSatellitesList(group);
    list.forEach((element) => {
      const index = SatelliteHandler.getInstance().listOfSatellites.findIndex(
        (satellite) => satellite.uuid === element
      );
      SatelliteHandler.getInstance().changePropertyValue(
        SatelliteHandler.getInstance().listOfSatellites[index],
        property,
        value
      );
    });
  }
  generateSatellitesListForGroup(group: IGroup) {
    const list = GroupHandler.getInstance().getGroupSatellitesList(group);
    let satellitesList: Array<ISatellite> = [];
    list.forEach((element) => {
      const index = SatelliteHandler.getInstance().listOfSatellites.findIndex(
        (satellite) => satellite.uuid === element
      );
      satellitesList.push(
        SatelliteHandler.getInstance().listOfSatellites[index]
      );
    });
    return satellitesList;
  }
}
