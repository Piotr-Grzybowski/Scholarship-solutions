import { recursivePromise } from "./recursivePromise";

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
    promise1,
    promise2,
    promise3,
    promise6,
    promise4,
    promise5,
  ];

  describe("Recursive Promise function", () => {
    it("should return the same result as native promise.all for resolved promises", async () => {
      expect.assertions(1);
      const result = await Promise.all(arrayOfResolvedPromises);
      await expect(recursivePromise(arrayOfResolvedPromises)).resolves.toEqual(
        result
      );
    });
    it("should return the same result as native promise.all when one of promises reject", async () => {
      const rejectedPromise = new Promise((resolve, reject) => {
        setTimeout(reject, 1000, "Bad robot");
      });
      const arrayOfPromisesWithRejection = [...arrayOfResolvedPromises];
      arrayOfPromisesWithRejection[5] = rejectedPromise;
      expect.assertions(3);
      try {
        const result = await recursivePromise(arrayOfPromisesWithRejection);
      } catch (err) {
        const error = err;
        await expect(error.results[5]).toBe("Bad robot");
        await expect(
          recursivePromise(arrayOfPromisesWithRejection)
        ).rejects.toEqual(error);
        await expect(error.results.length).toBe(6);
      }
    });
  });
});
