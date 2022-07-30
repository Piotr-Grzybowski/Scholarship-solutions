// helper object for generateCheckDigit function
export const digitWeight = {
  0: 1,
  1: 3,
  2: 7,
  3: 9,
  4: 1,
  5: 3,
  6: 7,
  7: 9,
  8: 1,
  9: 3,
};

// helper object for formatDateForPesel function
const centuries = {
  18: 80,
  19: 0,
  20: 20,
  21: 40,
  22: 60,
};

// given date returns it as a string in format yy/mm/dd
export function formatDateForPesel(date: Date): string {
  const century: number = Math.floor(date.getFullYear() / 100);
  const year: string =
    date.getFullYear() % 100 < 10
      ? "0" + (date.getFullYear() % 100)
      : (date.getFullYear() % 100) + "";
  const month: string =
    date.getMonth() + centuries[century] < 10
      ? "0" + (date.getMonth() + centuries[century] + 1)
      : date.getMonth() + centuries[century] + 1 + "";
  const day: string =
    date.getDate() < 10 ? "0" + date.getDate() : date.getDate() + "";
  return year + month + day;
}

// function creates 11th digit of pesel number checkDigit(liczba kontrolna)
export function generateCheckDigit(array: string[]): number {
  const checkDigit =
    array
      .map((element, index) => {
        return parseInt(element) * digitWeight[index];
      })
      .reduce((acc, element) => {
        return acc + element;
      }, 0) % 10;

  return checkDigit ? 10 - checkDigit : 0;
}

export const getRandomDigit = (oddOrEven?: "odd" | "even"): number => {
  if (oddOrEven === "even") return Math.floor((Math.random() * 10) / 2) * 2;
  if (oddOrEven === "odd") return Math.floor(Math.random() * 5) * 2 + 1;
  return Math.floor(Math.random() * 10);
};
