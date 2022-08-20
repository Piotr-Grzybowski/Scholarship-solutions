import { recursivePromise } from "./recursivePromise";

describe("Recursive Promise", () => {
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
      const resultOfResolvedPromises = await Promise.all(
        arrayOfResolvedPromises
      );
      await expect(recursivePromise(arrayOfResolvedPromises)).resolves.toEqual(
        resultOfResolvedPromises
      );
    });
    it("should return the same result as native promise.all when one of promises reject", async () => {
      expect.assertions(3);
      const resultOfPromisesWithRejection = await (
        await Promise.all(arrayOfResolvedPromises)
      ).slice(0, 5);
      const errorMessage = "Bad robot";
      const rejectedPromise = new Promise((resolve, reject) => {
        setTimeout(reject, 1000, errorMessage);
      });
      const arrayOfPromisesWithRejection = [...arrayOfResolvedPromises];
      arrayOfPromisesWithRejection[5] = rejectedPromise;
      try {
        await recursivePromise(arrayOfPromisesWithRejection);
      } catch (err) {
        await expect(err.message).toBe(errorMessage);
        await expect(err.results).toEqual(resultOfPromisesWithRejection);
        await expect(err.results.length).toBe(5);
      }
    });
  });
});
