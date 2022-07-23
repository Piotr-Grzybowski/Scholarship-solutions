import { validator } from "./validator/validator";
import {
  formatDateForPesel,
  getRandomDigit,
  generateCheckDigit,
} from "./utils/utils";

export function generatePesel(
  dateOfBirth: string | number,
  gender?: "male" | "female"
): string {
  if (validator(dateOfBirth)) {
    const date = new Date(dateOfBirth);
    // add date to the pesel in proper format(yy/mm/dd)
    let pesel: string = formatDateForPesel(date);
    // add three random digits
    for (let i = 0; i < 3; i++) {
      pesel += getRandomDigit();
    }
    // add gender if included if not another random digit
    pesel += gender
      ? gender === "male"
        ? getRandomDigit("odd")
        : getRandomDigit("even")
      : getRandomDigit();
    // create and add check digit
    pesel += generateCheckDigit(pesel.split(""));

    return pesel;
  }
  throw new Error("Wrong date!");
}
