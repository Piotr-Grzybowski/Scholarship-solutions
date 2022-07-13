import { mapFn, filterFn, everyFn, someFn } from "./masterReduce";

describe("Testing master reduce", () => {
  let arrayForNativeFunction: Array<number>;
  let arrayForImplementedFunction: Array<number>;

  beforeEach(() => {
    arrayForImplementedFunction = [5, 4, 3, 2, 1];
    arrayForNativeFunction = [5, 4, 3, 2, 1];
  });

  it("should return the same result as native map function", () => {
    const nativeResult = arrayForNativeFunction.map((element) => {
      return element * 2;
    });
    const implementedResult = mapFn(
      arrayForImplementedFunction,
      (element, index, array) => {
        return element * 2;
      }
    );

    expect(nativeResult).toStrictEqual(implementedResult);
  });

  it("should return the same result as native filter function", () => {
    const nativeResult = arrayForNativeFunction.filter((element) => {
      return element % 2 === 0;
    });
    const implementedResult = filterFn(
      arrayForImplementedFunction,
      (element, index, array) => {
        return element % 2 === 0;
      }
    );

    expect(nativeResult).toStrictEqual(implementedResult);
  });

  it("should return the same result as native every function", () => {
    const nativeResult = arrayForNativeFunction.every((element) => {
      return element < 10;
    });
    const implementedResult = everyFn(
      arrayForImplementedFunction,
      (element, index, array) => {
        return element < 10;
      }
    );
    const nativeResult1 = arrayForNativeFunction.every((element) => {
      return element > 2;
    });
    const implementedResult1 = everyFn(
      arrayForImplementedFunction,
      (element, index, array) => {
        return element > 2;
      }
    );

    expect(nativeResult).toStrictEqual(implementedResult);
    expect(nativeResult1).toStrictEqual(implementedResult1);
  });

  it("should return the same result as native some function", () => {
    const nativeResult = arrayForNativeFunction.some((element) => {
      return element < 10;
    });
    const implementedResult = someFn(
      arrayForImplementedFunction,
      (element, index, array) => {
        return element < 10;
      }
    );
    const nativeResult1 = arrayForNativeFunction.some((element) => {
      return element > 2;
    });
    const implementedResult1 = someFn(
      arrayForImplementedFunction,
      (element, index, array) => {
        return element > 2;
      }
    );

    expect(nativeResult).toStrictEqual(implementedResult);
    expect(nativeResult1).toStrictEqual(implementedResult1);
  });
});
