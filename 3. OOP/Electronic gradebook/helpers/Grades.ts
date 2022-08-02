import { grade, IGrades, IStudent, listOfElements } from "../types";
import { getIndex } from "../utils/getIndex";

export class Grades implements IGrades {
  private static instance: IGrades;
  gradesList: Array<listOfElements<grade>> = [];

  private constructor() {}

  public static getInstance(): IGrades {
    if (!this.instance) {
      this.instance = new Grades();
    }

    return this.instance;
  }

  showAllGrades(): listOfElements<grade>[] {
    return this.gradesList;
  }

  addGradeToStudent(student: IStudent, grade: grade): void {
    const indexOfStudent = getIndex(this.gradesList, student);
    if (indexOfStudent !== -1) {
      this.gradesList[indexOfStudent].listOfElements.push(grade);
    } else {
      this.gradesList.push({
        idOfUser: student.uuid,
        listOfElements: [grade],
      });
    }
  }

  showGradesOfStudent(student: IStudent): grade[] {
    const indexOfStudent = getIndex(this.gradesList, student);
    if (indexOfStudent !== -1) {
      return this.gradesList[indexOfStudent].listOfElements;
    }
    return [];
  }
}
