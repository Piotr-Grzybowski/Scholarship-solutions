import { IGroup, ISatellite } from "../types";
import { v4 as uuidv4 } from 'uuid';
import { getIndex } from '../helpers/getIndex';

export class GroupOfSatellites implements IGroup {
  readonly uuid: string;
  groupName : string;
  listOfSatellites: string[];

  constructor(groupName: string, listOfSatellites: string[]) {
    this.uuid = uuidv4();
    this.groupName = groupName;
    this.listOfSatellites = listOfSatellites;
  }
  addSatellite(satellite: ISatellite): void {
    if (!this.findSatellite(satellite)) this.listOfSatellites.push(satellite.uuid);
    else throw new Error("Satellite is already in this group!");
  }
  deleteSatellite(satellite: ISatellite): void {
    if (this.findSatellite(satellite)) this.listOfSatellites.splice(getIndex(this.listOfSatellites, satellite.uuid), 1);
    else throw new Error("There is no such satellite in this group!")
  }
  findSatellite(satellite: ISatellite): false | ISatellite {
    const index = getIndex(this.listOfSatellites, satellite.uuid);
    if (index !== -1) return satellite;
    return false;
  }
  changeGroupName(name: string): void {
    if (name.length > 3) this.groupName = name;
    else throw new Error("Group name has to be longer than 3 characters!");
  }
}