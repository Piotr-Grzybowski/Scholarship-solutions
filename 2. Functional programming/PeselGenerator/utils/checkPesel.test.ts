import { checkPesel } from "./checkPesel";

describe("Testing check pesel method", () => {
  // list of pesels was generated on "https://pesel.cstudios.pl/o-generatorze/generator-on-line"
  const validPesels = [
    "53070183649",
    "54042722453",
    "82032691588",
    "66101897268",
    "68012786626",
    "90122222341",
    "88021654529",
    "03310843491",
    "69010159375",
    "49072645225",
  ];
  const invalidPesels = [
    "53070183648",
    "54042722452",
    "82032691584",
    "66101897265",
    "68012786622",
    "90122222345",
    "88021654526",
    "03310843493",
    "69010159376",
    "49072645228",
  ];
  describe("Given valid pesel numbers", () => {
    test("should return true for each one", () => {
      for (let pesel of validPesels) {
        expect(checkPesel(pesel)).toBe(true);
      }
    });
  });
  describe("Given invalid pesel numbers", () => {
    test("should return false for each one", () => {
      for (let pesel of invalidPesels) {
        expect(checkPesel(pesel)).toBe(false);
      }
    });
  });
});
