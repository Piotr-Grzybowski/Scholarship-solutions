import { IPerson, listOfElements } from "../types";

export function getByIndex<T>(
  listOfUsers: Array<listOfElements<T>>,
  userId: IPerson
): number {
  return listOfUsers.find((element) => element.idOfUser === userId);
}
