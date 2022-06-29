import { onOff, changeableProperties, ISatellite, changeableValues, coordinates} from '../types';
import { v4 as uuidv4 } from 'uuid';

export class Satellite implements ISatellite {
  readonly uuid: string;
  altitude : number;
  coordinates: coordinates;
  solarSail: onOff;
  signalBroadcast: onOff;
  satelliteStatus: onOff;

  constructor(altitude: number, coordinates: coordinates, solarSail: onOff, signalBroadcast: onOff, satelliteStatus: onOff) {
    this.altitude = altitude;
    this.coordinates = coordinates;
    this.solarSail = solarSail;
    this.signalBroadcast = signalBroadcast;
    this.satelliteStatus = satelliteStatus;
    this.uuid = uuidv4();
  }
  changeProperty(propertyName: changeableProperties, value: changeableValues) {
    let solved;
    switch(propertyName) {
      case 'altitude': {
        if (typeof value === 'number') {
          this[propertyName] = value;
          solved = true;
        }
        break;
      }
      case 'coordinates': {
        if (typeof value === 'object') {
          if (value.hasOwnProperty('latitude') && value.hasOwnProperty('longitude')) {
            this[propertyName] = value;
            solved = true;
          }
        }
        break;
      }
      default: {
        if (typeof value === 'string') {
          if (value === 'on' || value === 'off') {
            this[propertyName] = value;
            solved = true;
          }
        }
        break;
      }
    }
    if (!solved) throw new Error("Wrong input data for property");
  }
}