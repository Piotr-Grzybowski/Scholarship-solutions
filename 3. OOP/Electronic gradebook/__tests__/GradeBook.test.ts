import {
  IStudent,
  IParent,
  ITeacher,
  IClassTeacher,
  IGradeBook,
} from "../types";
import {
  students,
  parents,
  teachers,
  classTeachers,
} from "../utils/collectionOfStudentsParentsAndTeachers";
import { GradeBook } from "../GradeBook";

describe("Testing gradebook", () => {
  const student1: IStudent = students[0];
  const student2: IStudent = students[1];
  const student3: IStudent = students[2];
  const parent1: IParent = parents[0];
  const parent2: IParent = parents[1];
  const parentWithoutAssignedChild: IParent = parents[2];
  const teacher1: ITeacher = teachers[0];
  const classTeacher: IClassTeacher = classTeachers[0];
  const gradebook: IGradeBook = new GradeBook(classTeacher);

  beforeAll(() => {
    gradebook.addStudent(student1);
    gradebook.addStudent(student2);
    gradebook.addStudent(student3);
    gradebook.addParent(parent1);
    gradebook.addParent(parent2);
    gradebook.addParent(parentWithoutAssignedChild);
    gradebook.addTeacher(teacher1);
    gradebook.addParentToStudent(parent1, student1);
    gradebook.addParentToStudent(parent2, student2);
  });

  describe("GIVEN there is a test planned", () => {
    describe("WHEN class teacher sends messages to all students about upcoming test", () => {
      test("THEN all students are informed", () => {
        const message = {
          title: "Upcoming test",
          body: "Hello everyone, W would like to inform you about big test next Tuesday. Find time to prepare yourself. Best wishes",
        };
        gradebook.sendMessageToAllStudents(message);
        const listOfStudents = gradebook.getListOfStudents();
        for (let student of listOfStudents) {
          expect(student.readMyMessages()[0]).toStrictEqual({
            ...message,
            status: "unread",
          });
        }
      });
    });
  });
  describe("GIVEN we are after the test", () => {
    describe("WHEN one student did not show up and two others got 5", () => {
      test("THEN all students have proper grades and absences on their profiles", () => {
        const absence = {
          dateOfAbsence: "27/09/2022",
        };
        const grade = {
          subject: "biology",
          grade: "5",
        };
        gradebook.addAbsenceToStudent(student1, absence);
        gradebook.addGradeToStudent(student2, grade);
        gradebook.addGradeToStudent(student3, grade);

        expect(gradebook.getAbsencesOfStudent(student1)[0]).toStrictEqual({
          ...absence,
          excused: false,
        });
        expect(gradebook.getGradesOfStudent(student2)[0]).toBe(grade);
        expect(gradebook.getGradesOfStudent(student3)[0]).toBe(grade);
      });
    });
  });
  describe("GIVEN parent wants to excuse absence of his child", () => {
    describe("WHEN child is assigned to him", () => {
      test("THEN absence is excused", () => {
        const absence = {
          dateOfAbsence: "27/09/2022",
          excused: false,
        };
        parent1.excuseTheAbsence(absence);

        expect(gradebook.getAbsencesOfStudent(student1)[0].excused).toBe(true);
      });
    });
    describe("WHEN for some reason child is not assigned to him", () => {
      test("THEN absence can not be excused", () => {
        const absence = {
          dateOfAbsence: "27/09/2022",
          excused: false,
        };
        expect(() =>
          parentWithoutAssignedChild.excuseTheAbsence(absence)
        ).toThrow("There is no child assigned to this parent!");
      });
    });
  });
});
