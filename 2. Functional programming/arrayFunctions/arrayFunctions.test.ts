import {
  forEachFn,
  mapFn,
  entriesFn,
  filterFn,
  reduceFn,
  everyFn,
  someFn,
  entriesFnGen,
} from "./arrayFunctions";

describe("Testing array functions", () => {
  let arrayForImplementedFunction: Array<number>;
  let arrayForNativeFunction: Array<number>;

  beforeEach(() => {
    arrayForImplementedFunction = [1, 2, 3, 4, 5];
    arrayForNativeFunction = [1, 2, 3, 4, 5];
  });

  it("should work the same way as native ForEach", () => {
    let implementedResult: Array<number> = [];
    let nativeResult: Array<number> = [];
    forEachFn(arrayForImplementedFunction, (element, index, array) => {
      implementedResult.push(element * 2);
    });
    arrayForNativeFunction.forEach((element, index, array) => {
      nativeResult.push(element * 2);
    });

    expect(implementedResult).toStrictEqual(nativeResult);
  });

  it("should return the same array as native map function", () => {
    const implementedResult = mapFn(
      arrayForImplementedFunction,
      (element, index, array) => {
        element * 2;
      }
    );
    const nativeResult = arrayForNativeFunction.map((element) => {
      element * 2;
    });

    expect(implementedResult).toStrictEqual(nativeResult);
  });

  it("should return the same array as native filter function", () => {
    const implementedResult = filterFn(
      arrayForImplementedFunction,
      (element, index, array) => {
        return element % 2 === 0;
      }
    );
    const nativeResult = arrayForNativeFunction.filter((element) => {
      return element % 2 === 0;
    });

    expect(implementedResult).toStrictEqual(nativeResult);
  });

  it("should return the same value as native every function", () => {
    const implementedResult = everyFn(
      arrayForImplementedFunction,
      (element, index, array) => {
        return element < 6;
      }
    );
    const nativeResult = arrayForNativeFunction.every((element) => {
      return element < 6;
    });

    expect(nativeResult).toStrictEqual(implementedResult);
  });

  it("should return the same value as native every function", () => {
    const implementedResult = someFn(
      arrayForImplementedFunction,
      (element, index, array) => {
        return element % 2 === 0;
      }
    );
    const nativeResult = arrayForNativeFunction.some((element) => {
      return element % 2 === 0;
    });

    expect(nativeResult).toStrictEqual(implementedResult);
  });

  describe("Testing reduce function", () => {
    it("should return the same result as native reduce function", () => {
      const implementedResult = reduceFn(
        arrayForImplementedFunction,
        (accumulator, element) => {
          return element + accumulator;
        }
      );
      const nativeResult = arrayForNativeFunction.reduce(
        (accumulator, element) => {
          return accumulator + element;
        }
      );
      expect(implementedResult).toBe(nativeResult);
    });

    it("should return the same result as native reduce function when given initial value", () => {
      const implementedResult = reduceFn(
        arrayForImplementedFunction,
        (accumulator, element) => {
          return element + accumulator;
        },
        20
      );
      const nativeResult = arrayForNativeFunction.reduce(
        (accumulator, element) => {
          return accumulator + element;
        },
        20
      );
      expect(implementedResult).toBe(nativeResult);
    });

    it("should throw an error when array is empty and no initial value", () => {
      expect(() => reduceFn([], (acc, element) => element)).toThrow(
        "Type Error"
      );
    });
  });

  it("should work the same like native entries function", () => {
    const nativeResult = arrayForNativeFunction.entries();
    const implementedResult = entriesFn(arrayForImplementedFunction);

    expect(nativeResult.next().value).toEqual(implementedResult.next().value);
    expect(nativeResult.next().done).toEqual(implementedResult.next().done);
  });

  it("should return iterator like native entries function", () => {
    const nativeResult = arrayForNativeFunction.entries();
    const implementedResultEntriesGen = entriesFnGen(
      arrayForImplementedFunction
    );

    expect(nativeResult.next().value).toEqual(
      implementedResultEntriesGen.next().value
    );
    expect(nativeResult.next().done).toEqual(
      implementedResultEntriesGen.next().done
    );
  });
});
