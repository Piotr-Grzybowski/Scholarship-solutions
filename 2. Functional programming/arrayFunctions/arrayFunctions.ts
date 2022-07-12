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

export const filterFn = <T>(
  array: Array<T>,
  callback: (element: T, index: number, array: Array<T>) => boolean
): T[] => {
  let newArray: Array<T> = [];
  for (let i = 0; i < array.length; i++) {
    if (callback(array[i], i, array)){
      newArray.push(array[i]);
    }
  }
  return newArray;
};

export const reduceFn = (array, callback, inital) => {};

export const everyFn = <T>(
  array: Array<T>,
  callback: (element: T, index: number, array: Array<T>) => boolean
): boolean => {
  for (let i = 0; i < array.length; i++) {
    if (!callback(array[i], i, array)){
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
    if (!callback(array[i], i, array)){
      return true;
    }
  }
  return false;
};
