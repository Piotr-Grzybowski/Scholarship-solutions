import { changeablePropertiesForOperator, changeableValues, IGroup, IOperator, ISatellite } from "../types";
import { v4 as uuidv4 } from 'uuid';
import { SatelliteHandler } from "../helpers/ISatelliteHandler/SatelliteHandler";
import { GroupHandler } from "../helpers/IGroupHandler/GroupHandler";


export class Operator implements IOperator {
  readonly uuid: string;
  firstName: string;
  lastName: string;
  protected satelliteHandler = new SatelliteHandler([]);
  protected groupHandler = new GroupHandler([]);

  constructor(firstName: string, lastName: string) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.uuid = uuidv4();
  }

  addSatellite(satellite: ISatellite): void {
    this.satelliteHandler.addSatellite(satellite);
  }
  deleteSatellite(satellite: ISatellite): void {
    this.satelliteHandler.deleteSatellite(satellite);
    this.groupHandler.deleteSatelliteFromAllGroups(satellite);
  }
  findSatellite(satellite: ISatellite): false | ISatellite {
    return this.satelliteHandler.findSatellite(satellite);
  }
  addGroup(group: IGroup): void {
    this.groupHandler.addGroup(group);
  }
  deleteGroup(group: IGroup): void {
    this.groupHandler.deleteGroup(group);
  }
  changeGroupName(group: IGroup, name: string): void {
    this.groupHandler.changeGroupName(group, name);
  }
  addSatelliteToTheGroup(group: IGroup, satellite: ISatellite): void {
    this.groupHandler.addSatelliteToTheGroup(group, satellite);
  }
  deleteSatelliteFromGroup(group: IGroup, satellite: ISatellite): void {
    this.groupHandler.deleteSatelliteFromGroup(group, satellite);
  }
  findSatelliteInGroup(group: IGroup, satellite: ISatellite): false | ISatellite {
    return this.groupHandler.findSatelliteInGroup(group, satellite);
  }
  changePropertyValueForSatellite(satellite: ISatellite, property: changeablePropertiesForOperator, value: changeableValues): void {
    this.satelliteHandler.changePropertyValue(satellite, property, value);
  }
  changePropertyValueForGroup(group: IGroup, property: changeablePropertiesForOperator, value: changeableValues): void {
    const list = this.groupHandler.getGroupSatellitesList(group);
    list.forEach(element => {
      const index = this.satelliteHandler.listOfSatellites.findIndex(satellite => satellite.uuid === element);
      this.satelliteHandler.changePropertyValue(this.satelliteHandler.listOfSatellites[index], property, value);
    })
  }
  generateSatellitesListForGroup(group: IGroup) {
    const list = this.groupHandler.getGroupSatellitesList(group);
    let satellitesList: Array<ISatellite> = [];
    list.forEach(element => {
      const index = this.satelliteHandler.listOfSatellites.findIndex(satellite => satellite.uuid === element);
      satellitesList.push(this.satelliteHandler.listOfSatellites[index]);
    })
    return satellitesList;
  }
}