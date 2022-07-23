import { generatePesel } from "./peselGenerator";
import { checkPesel } from "./utils/utils";

describe("Testing pesel generator", () => {
  describe("Given date of birth", () => {
    const firstValidDateOfBirth = "2012/08/12";
    const secondValidDateOfBirth = "1800/12/03";
    const invalidDateOfBirth = "1799/12/02";

    describe("When no gender specified", () => {
      test("Then I should get valid pesel", () => {
        const firstPesel = generatePesel(firstValidDateOfBirth);
        const secondPesel = generatePesel(secondValidDateOfBirth);

        expect(checkPesel(firstPesel)).toBe(true);
        expect(checkPesel(secondPesel)).toBe(true);
        expect(firstPesel.slice(0, 6)).toBe("120812");
      });
    });
    describe("When male specified", () => {
      test("Then I should get valid pesel with 10th digit being odd", () => {});
    });
    describe("When female specified", () => {
      test("Then I should get valid pesel with 10th digit being even", () => {});
    });
    describe("When birth date is from before 1800 or after 2499", () => {
      test("Then I should have error thrown with message 'Wrong date!'", () => {});
    });
  });
});
