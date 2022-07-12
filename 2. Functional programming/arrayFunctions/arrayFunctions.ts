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

// export const entriesFn = (array) => {};

// export const filterFn = (array, callback) => {};

// export const reduceFn = (array, callback, inital) => {};

// export const everyFn = (array, callback) => {};

// export const someFn = (array, callback) => {};
