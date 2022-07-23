// function checks if pesel is valid created for testing purpose
import { digitWeight } from "./utils";

export function checkPesel(pesel: string): boolean {
  const checkSum = pesel.split("").reduce((acc, element, index) => {
    return (acc += parseInt(element) * (digitWeight[index] || 1));
  }, 0);
  return checkSum % 10 === 0;
}
