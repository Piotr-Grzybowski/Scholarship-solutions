import { IGroup, IGroupHandler, ISatellite } from "../../types";
import { getIndex } from "../getIndex";

export class GroupHandler implements IGroupHandler {
  listOfGroups: IGroup[];

  constructor(listOfGroups: IGroup[]) {
    this.listOfGroups = listOfGroups;
  }

  addGroup(group: IGroup): void {
    if (!this.findGroup(group)) this.listOfGroups.push(group)
    else throw new Error("Group already exist!");
  }
  deleteGroup(group: IGroup): void {
    if (this.checkIfGroupExist(group)) {
      const index = getIndex(this.listOfGroups, group);
      this.listOfGroups.splice(index, 1);
    }
  }
  findGroup(group: IGroup): IGroup | false{
    const index = getIndex(this.listOfGroups, group);
    if (index !== -1) return group;
    return false;
  }
  addSatelliteToTheGroup(group: IGroup, satellite: ISatellite): void {
    if (this.checkIfGroupExist(group)) {
      const groupIndex = getIndex(this.listOfGroups, group);
      this.listOfGroups[groupIndex].addSatellite(satellite);
    }
  }
  deleteSatelliteFromGroup(group: IGroup, satellite: ISatellite): void {
    if (this.checkIfGroupExist(group)) {
      const groupIndex = getIndex(this.listOfGroups, group);
      this.listOfGroups[groupIndex].deleteSatellite(satellite);
    }
  }
  deleteSatelliteFromAllGroups(satellite: ISatellite): void {
    this.listOfGroups.forEach(group => {
      if (group.findSatellite(satellite)) {
        const index = getIndex(group.listOfSatellites, satellite.uuid);
        group.listOfSatellites.splice(index, 1);
      }
    })
  }
  findSatelliteInGroup(group: IGroup, satellite: ISatellite): false | ISatellite {
    if (this.checkIfGroupExist(group)) {
      const groupIndex = getIndex(this.listOfGroups, group);
      return this.listOfGroups[groupIndex].findSatellite(satellite);
    }
    return false;
  }
  changeGroupName(group: IGroup, name: string): void {
    if (this.checkIfGroupExist(group)) {
      const groupIndex = getIndex(this.listOfGroups, group);
      this.listOfGroups[groupIndex].changeGroupName(name);
    }
  }
  getGroupSatellitesList(group: IGroup): string[] {
    if (this.checkIfGroupExist(group)) {
      const index = getIndex(this.listOfGroups, group);
      return this.listOfGroups[index].listOfSatellites;
    }
    return [];
  }
  private checkIfGroupExist(group: IGroup): boolean {
    if (getIndex(this.listOfGroups, group) !== -1) return true;
    throw new Error("There is no such a group!")
  }
}