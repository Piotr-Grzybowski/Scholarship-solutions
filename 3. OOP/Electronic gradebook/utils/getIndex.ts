import { IPerson, listOfElements } from "../types";

export function getIndex<T>(
  listOfUsers: Array<listOfElements<T>>,
  user: IPerson
): number {
  return listOfUsers.findIndex((element) => element.idOfUser === user.uuid);
}
