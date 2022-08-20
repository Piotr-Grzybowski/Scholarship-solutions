import { absence, listOfElements, IAbsences, IStudent } from "../types";
import { getIndex } from "../utils/getIndex";

export class Absences implements IAbsences {
  private static instance: IAbsences;
  absencesList: Array<listOfElements<absence>> = [];

  private constructor() {}

  public static getInstance(): IAbsences {
    if (!this.instance) {
      this.instance = new Absences();
    }

    return this.instance;
  }

  showAllAbsences(): Array<listOfElements<absence>> {
    return this.absencesList;
  }

  showAbsencesOfStudent(student: IStudent): Array<absence> {
    const indexOfStudent = getIndex(this.absencesList, student);
    if (indexOfStudent !== -1) {
      return this.absencesList[indexOfStudent].listOfElements;
    }
    return [];
  }

  addAbsence(student: IStudent, absence: absence): void {
    const indexOfStudent = getIndex(this.absencesList, student);
    if (indexOfStudent !== -1) {
      this.absencesList[indexOfStudent].listOfElements.push({
        ...absence,
        excused: false,
      });
    } else {
      this.absencesList.push({
        idOfUser: student.uuid,
        listOfElements: [{ ...absence, excused: false }],
      });
    }
  }

  excuseTheAbsence(student: IStudent, absence: absence) {
    const indexOfStudent = getIndex(this.absencesList, student);
    if (indexOfStudent !== -1) {
      const searchedAbsence = this.absencesList[
        indexOfStudent
      ].listOfElements.find(
        (element) => element.dateOfAbsence === absence.dateOfAbsence
      );
      if (searchedAbsence !== undefined) {
        searchedAbsence.excused = true;
      } else throw new Error("There is no such an absence!");
    } else
      throw new Error(
        "There is no such a student or student does not have any absences!"
      );
  }
}
