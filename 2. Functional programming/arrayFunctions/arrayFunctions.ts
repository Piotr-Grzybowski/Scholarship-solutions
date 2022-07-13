export const forEachFn = <T>(
  array: Array<T>,
  callback: (element: T, index: number, array: Array<T>) => void
): void => {
  for (let i = 0; i < array.length; i++) {
    callback(array[i], i, array);
  }
};

export const mapFn = <T, U>(
  array: Array<T>,
  callback: (element: T, index: number, array: Array<T>) => U
): U[] => {
  let newArray: Array<U> = [];
  for (let i = 0; i < array.length; i++) {
    newArray.push(callback(array[i], i, array));
  }
  return newArray;
};

/**
 * Method entries() returns iterator with method next that lets us access next element
 * Every element has format {done: false/true, value: [index, value]}
 * Value of done define if iteration is finished or not
 * Under value property we can find an array with index and value of current element
 */
export const entriesFn = <T>(array: Array<T>) => {
  const newArray = [];

  for (let index = 0; index < array.length; index++) {
    newArray.push([index, array[index]]);
  }

  return newArray[Symbol.iterator]();
};

/**
 * Solution of method entries() but using generator instead Symbol.iterator method
 */
export function* entriesFnGen<T>(array: Array<T>) {
  for (let i = 0; i < array.length; i++) yield [i, array[i]];
}

export const filterFn = <T>(
  array: Array<T>,
  callback: (element: T, index: number, array: Array<T>) => boolean
): T[] => {
  let newArray: Array<T> = [];
  for (let i = 0; i < array.length; i++) {
    if (callback(array[i], i, array)) {
      newArray.push(array[i]);
    }
  }
  return newArray;
};

export const reduceFn = <T, U>(
  array: Array<T>,
  callback: (accumulator: T | U, element: T, index: number, array: T[]) => U,
  initial?: T | U
): T | U => {
  if (array.length < 1 && !initial) {
    throw new Error("Type Error");
  }
  let accumulator: T | U;
  accumulator = initial || array[0];

  for (let i = initial ? 0 : 1; i < array.length; i++) {
    accumulator = callback(accumulator, array[i], i, array);
  }
  return accumulator;
};

export const everyFn = <T>(
  array: Array<T>,
  callback: (element: T, index: number, array: Array<T>) => boolean
): boolean => {
  for (let i = 0; i < array.length; i++) {
    if (!callback(array[i], i, array)) {
      return false;
    }
  }
  return true;
};

export const someFn = <T>(
  array: Array<T>,
  callback: (element: T, index: number, array: Array<T>) => boolean
): boolean => {
  for (let i = 0; i < array.length; i++) {
    if (!callback(array[i], i, array)) {
      return true;
    }
  }
  return false;
};
