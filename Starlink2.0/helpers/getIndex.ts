import { ISatellite } from "../types";

export function getIndex<T>(array: T[], uuid: T) {
  return array.findIndex(element => element === uuid);
}