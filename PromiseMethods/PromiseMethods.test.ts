import {
  promiseAll,
  promiseAllAsync,
  promiseRace,
  promiseRaceAsync,
  promiseIgnoreErrors,
  promiseIgnoreErrorsAsync,
  promiseLast,
  promiseLastAsync,
} from "./PromiseMethods";

describe("Promise methods", () => {
  // some dummy promises for tests
  const promise1 = Promise.resolve(1);
  const promise2 = Promise.resolve(true);
  const promise3 = Promise.resolve(false);
  const promise4 = Promise.resolve("Some text!");
  const promise5 = new Promise((resolve, reject) => {
    setTimeout(resolve, 1000, "foo");
  });
  const promise6 = new Promise((resolve, reject) => {
    setTimeout(resolve, 1500, "awesome");
  });
  const arrayOfResolvedPromises = [
    promise1,
    promise2,
    promise3,
    promise6,
    promise4,
    promise5,
  ];

  describe("Promise all function", () => {
    it("should return the same result as native promise.all for resolved promises", async () => {
      expect.assertions(2);
      const result = await Promise.all(arrayOfResolvedPromises);

      await expect(promiseAll(arrayOfResolvedPromises)).resolves.toEqual(
        result
      );
      await expect(promiseAll(arrayOfResolvedPromises)).resolves.toEqual(
        result
      );
    });
    it("should return the same result as native promise.all when one of promises reject", async () => {
      const rejectedPromise = new Promise((resolve, reject) => {
        setTimeout(reject, 1000, "Bad robot");
      });
      const arrayOfPromisesWithRejection = [
        ...arrayOfResolvedPromises,
        rejectedPromise,
      ];
      expect.assertions(3);
      try {
        await Promise.all(arrayOfPromisesWithRejection);
      } catch (err) {
        const error = err;
        await expect(error).toBe("Bad robot");
        await expect(promiseAll(arrayOfPromisesWithRejection)).rejects.toEqual(
          error
        );
        await expect(
          promiseAllAsync(arrayOfPromisesWithRejection)
        ).rejects.toEqual(error);
      }
    });
  });

  describe("Promise race function", () => {
    expect.assertions(2);
    it("should return the same result as native promise.race with resolved values or promises", async () => {
      const result = await Promise.race(arrayOfResolvedPromises);

      await expect(promiseRace(arrayOfResolvedPromises)).resolves.toEqual(
        result
      );
      await expect(promiseRace(arrayOfResolvedPromises)).resolves.toEqual(
        result
      );
    });
    it("should return the same result as native promise.race with rejected values or promises", async () => {
      const fastRejectedPromise = new Promise((resolve, reject) => {
        setTimeout(reject, 300, "Bad robot baby");
      });
      const oneSecondPromise = new Promise((resolve, reject) => {
        setTimeout(resolve, 1000, "foo");
      });
      const halfASecondPromise = new Promise((resolve, reject) => {
        setTimeout(resolve, 1100, "awesome");
      });
      const arrayForRaceReject = [
        halfASecondPromise,
        fastRejectedPromise,
        oneSecondPromise,
      ];
      expect.assertions(3);
      try {
        const result = await Promise.race(arrayForRaceReject);
      } catch (err) {
        const error = err;
        await expect(error).toBe("Bad robot baby");
        await expect(promiseRace(arrayForRaceReject)).rejects.toEqual(error);
        await expect(promiseRaceAsync(arrayForRaceReject)).rejects.toEqual(
          error
        );
      }
    });
  });

  describe("Promise ignore all errors function", () => {
    it("should return the same result as as hardcoded solution when there is rejected promise", async () => {
      const expectedResult = [1, true, false, "awesome", "Some text!", "foo"];
      const rejectedPromise = new Promise((resolve, reject) => {
        setTimeout(reject, 1000, "Bad robot");
      });
      const arrayOfPromisesWithRejection = [
        ...arrayOfResolvedPromises,
        rejectedPromise,
      ];
      expect.assertions(2);
      await expect(
        promiseIgnoreErrors(arrayOfPromisesWithRejection)
      ).resolves.toEqual(expectedResult);
      await expect(
        promiseIgnoreErrorsAsync(arrayOfPromisesWithRejection)
      ).resolves.toEqual(expectedResult);
    });
  });

  describe("Promise last function", () => {
    it("should return the same result as hardcoded solution when all promises resolved", async () => {
      // expect.assertions(2);
      const arrayOfPromises = [
        promise1,
        promise2,
        promise4,
        promise5,
        promise6,
      ];
      const expectedResult = "awesome";

      await expect(promiseLast(arrayOfPromises)).resolves.toEqual(
        expectedResult
      );
      await expect(promiseLastAsync(arrayOfPromises)).resolves.toEqual(
        expectedResult
      );
    });
    it("should return the same result as hardcoded solution when there is a rejected promise", async () => {
      expect.assertions(2);
      const expectedResult = "Bad robot";
      const rejectedPromise = new Promise((resolve, reject) => {
        setTimeout(reject, 1000, "Bad robot");
      });
      const arrayOfPromisesWithRejection = [
        ...arrayOfResolvedPromises,
        rejectedPromise,
      ];

      await expect(promiseLast(arrayOfPromisesWithRejection)).rejects.toEqual(
        expectedResult
      );
      await expect(
        promiseLastAsync(arrayOfPromisesWithRejection)
      ).rejects.toEqual(expectedResult);
    });
  });
});
