type onOff = "on" | "off";
type changeProperty = 'altitude' | 'coordinates';

export interface ISatellite {
  readonly uuid: string,
  altitude : number,
  coordinates: [number, number],
  solarSail: onOff,
  signalBroadcast: onOff,
  satelliteStatus: onOff,
  changeProperty(propertyName: changeProperty): void,
  toggle(propertyName: onOff, onOrOff: onOff): void
}

export interface IGroup {
  readonly uuid: string,
  groupName: string,
  listOfSatellites: Array<ISatellite>,
  addSatellite(satellite: ISatellite): void,
  deleteSatellite(satellite: ISatellite): void,
  changeGroupName(name: string): void,
}

export interface IOperator {
  readonly uuid: string,
  firstName: string,
  lastName: string,

}

export interface IOverlord extends IOperator {

}