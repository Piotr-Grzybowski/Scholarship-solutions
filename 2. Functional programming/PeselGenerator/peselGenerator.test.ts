import { generatePesel } from "./peselGenerator";
import { checkPesel } from "./utils/checkPesel";

describe("Testing pesel generator", () => {
  describe("Given date of birth", () => {
    const firstValidDateOfBirth = "2012/08/12";
    const secondValidDateOfBirth = "1800/12/03";
    const firstInvalidDateOfBirth = "1799/12/02";
    const secondInvalidDateOfBirth = "2501/12/02";

    describe("When no gender specified", () => {
      test("Then I should get valid pesel", () => {
        const firstPesel = generatePesel(firstValidDateOfBirth);
        const secondPesel = generatePesel(secondValidDateOfBirth);

        expect(checkPesel(firstPesel)).toBe(true);
        expect(checkPesel(secondPesel)).toBe(true);
        expect(firstPesel.slice(0, 6)).toBe("122812");
        expect(secondPesel.slice(0, 6)).toBe("009203");
      });
    });
    describe("When male gender specified", () => {
      test("Then I should get valid pesel with 10th digit being odd", () => {
        const firstPesel = generatePesel(firstValidDateOfBirth, "male");
        const secondPesel = generatePesel(secondValidDateOfBirth, "male");

        expect(checkPesel(firstPesel)).toBe(true);
        expect(checkPesel(secondPesel)).toBe(true);
        expect(firstPesel.slice(0, 6)).toBe("122812");
        expect(secondPesel.slice(0, 6)).toBe("009203");
        // check if 10th number of pesel is odd which means male
        expect(parseInt(firstPesel[9]) % 2).toBe(1);
        expect(parseInt(secondPesel[9]) % 2).toBe(1);
      });
    });
    describe("When female gender specified", () => {
      test("Then I should get valid pesel with 10th digit being even", () => {
        const firstPesel = generatePesel(firstValidDateOfBirth, "female");
        const secondPesel = generatePesel(secondValidDateOfBirth, "female");

        expect(checkPesel(firstPesel)).toBe(true);
        expect(checkPesel(secondPesel)).toBe(true);
        expect(firstPesel.slice(0, 6)).toBe("122812");
        expect(secondPesel.slice(0, 6)).toBe("009203");
        // check if 10th number of pesel is even which means female
        expect(parseInt(firstPesel[9]) % 2).toBe(0);
        expect(parseInt(secondPesel[9]) % 2).toBe(0);
      });
    });
    describe("When birth date is from before 1800 or after 2499", () => {
      test("Then I should have error thrown with message 'Wrong date!'", () => {
        expect(() => generatePesel(firstInvalidDateOfBirth)).toThrow(
          "Wrong date!"
        );
        expect(() => generatePesel(secondInvalidDateOfBirth)).toThrow(
          "Wrong date!"
        );
      });
    });
  });
});
