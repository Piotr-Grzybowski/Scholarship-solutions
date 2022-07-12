export function mapFn<T, U>(
  array: Array<T>,
  callback: <T, U>(element: T, index: number, array: T[]) => U
): U[] {
  return array.reduce((acc, element, index, array) => {
    return [...acc, callback(element, index, array)];
  }, []);
}

export function filterFn<T>(
  array: Array<T>,
  callback: (element: T, index: number, array: T[]) => boolean
): T[] {
  return array.reduce((acc, element, index, array) => {
    if (callback(element, index, array)) acc.push(element);
    return acc;
  }, []);
}

export function everyFn<T>(
  array: Array<T>,
  callback: (element: T, index: number, array: T[]) => boolean
): boolean {
  return array.reduce((acc, element, index, array) => {
    if (!callback(element, index, array)) acc = false;
    return acc;
  }, true);
}

function someFn<T>(
  array: Array<T>,
  callback: (element: T, index: number, array: T[]) => boolean
): boolean {
  return array.reduce((acc, element, index, array) => {
    if (callback(element, index, array)) acc = true;
    return acc;
  }, false);
}
