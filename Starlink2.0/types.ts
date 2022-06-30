export type onOff = "on" | "off";
export type changeableProperties = 'altitude' | 'coordinates' | "solarSail" | "signalBroadcast" | "satelliteStatus";
export type changeablePropertiesForOperator = 'altitude' | 'coordinates' | "solarSail" | "signalBroadcast";
export type changeableValues = number | coordinates | onOff;
export type coordinates = {
  latitude: number;
  longitude: number;
}

export interface ISatellite {
  readonly uuid: string,
  altitude : number,
  coordinates: coordinates,
  solarSail: onOff,
  signalBroadcast: onOff,
  satelliteStatus: onOff,
  changeProperty(propertyName: changeableProperties, value: changeableValues): void,
}

export interface IGroup {
  readonly uuid: string,
  groupName: string,
  listOfSatellites: string[],
  addSatellite(satellite: ISatellite): void,
  deleteSatellite(satellite: ISatellite): void,
  findSatellite(satellite: ISatellite): ISatellite | false;
  changeGroupName(name: string): void,
}

export interface ISatelliteHandler {
  listOfSatellites: Array<ISatellite>,
  addSatellite(satellite: ISatellite): void,
  deleteSatellite(satellite: ISatellite): void,
  findSatellite(satellite: ISatellite): ISatellite | false,
  changePropertyValue(satellite: ISatellite, property: changeablePropertiesForOperator, value: changeableValues): void,
}

export interface IGroupHandler {
  listOfGroups: Array<IGroup>,
  addGroup(group: IGroup): void,
  deleteGroup(group: IGroup): void,
  findGroup(group: IGroup): void,
  addSatelliteToTheGroup(group: IGroup, satellite: ISatellite): void,
  deleteSatelliteFromGroup(group: IGroup, satellite: ISatellite): void,
  deleteSatelliteFromAllGroups(satellite: ISatellite): void,
  findSatelliteInGroup(group: IGroup, satellite: ISatellite): ISatellite | false,
  changeGroupName(group: IGroup, name: string): void
}

export interface IOperator {
  readonly uuid: string,
  firstName: string,
  lastName: string,
  addSatellite(satellite: ISatellite): void,
  deleteSatellite(satellite: ISatellite): void,
  findSatellite(satellite: ISatellite): ISatellite | false,
  addGroup(group: IGroup): void,
  deleteGroup(group: IGroup): void,
  changeGroupName(group: IGroup, name: string): void,
  findGroup(group: IGroup): false | IGroup;
  findSatelliteInGroup(group: IGroup, satellite: ISatellite): ISatellite | false,
  addSatelliteToTheGroup(group: IGroup, satellite: ISatellite): void,
  deleteSatelliteFromGroup(group: IGroup, satellite: ISatellite): void,
  changePropertyValueForSatellite(satellite: ISatellite, property: changeablePropertiesForOperator, value: changeableValues): void,
  changePropertyValueForGroup(group: IGroup, property: changeablePropertiesForOperator, value: changeableValues): void,
  generateSatellitesListForGroup(group: IGroup): void,
}

export interface IOverlord extends IOperator {
  changeSatelliteStatus(satellite: ISatellite, value: onOff): void,
  changeGroupStatus(group: IGroup, value: onOff): void,
  changeSystemStatus(value: onOff): void
}