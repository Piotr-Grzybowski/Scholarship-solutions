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
    it("when none of promises rejects, returns the same result as native promise.all", async () => {
      // Function should return the same result as Promise.all just works differently
      expect.assertions(1);
      // given user
      // const user = req.body.user;

      // when he tries to take the money
      // and his cart is valid
      //const cart = db.carts(user.cart)

      // and has money in it
      // if (cart.money > 0)

      // and he requests enough money he has in the bank

      // if (cart.money > 0)
      const resultOfResolvedPromises = await Promise.all(
        arrayOfResolvedPromises
      );

      const resolver = async () =>
        await recursivePromise(arrayOfResolvedPromises);

      expect(resolver).toEqual(resultOfResolvedPromises);
    });
    it("when one of promises rejects, returns error and results of promises already fulfilled", async () => {
      expect.assertions(3);

      const indexOfRejectedPromise = 5;
      const errorMessage = "Bad robot";
      const rejectedPromise = new Promise((resolve, reject) => {
        setTimeout(reject, 1000, errorMessage);
      });
      const arrayOfPromisesWithRejection = [...arrayOfResolvedPromises];
      arrayOfPromisesWithRejection[indexOfRejectedPromise] = rejectedPromise;

      const resultForPromisesWithRejection = await Promise.all(
        arrayOfResolvedPromises.slice(0, indexOfRejectedPromise)
      );

      try {
        await recursivePromise(arrayOfPromisesWithRejection);
      } catch (err) {
        await expect(err.message).toBe(errorMessage);
        await expect(err.results).toEqual(resultForPromisesWithRejection);
        await expect(err.results.length).toBe(indexOfRejectedPromise);
      }
    });
  });
});
