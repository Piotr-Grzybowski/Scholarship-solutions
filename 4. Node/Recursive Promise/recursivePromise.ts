export function returnPromiseResult<T>(
  arrayOfPromises: Array<T>,
  currentIndex: number = 0,
  arrayOfResults: Array<T> = []
): Promise<T[]> {
  return Promise.resolve(arrayOfPromises[currentIndex])
    .then((result) => {
      arrayOfResults.push(result);
      if (currentIndex === arrayOfPromises.length - 1) {
        return arrayOfResults;
      }
      return returnPromiseResult(
        arrayOfPromises,
        ++currentIndex,
        arrayOfResults
      );
    })
    .catch((error) => {
      arrayOfResults.push(error);
      throw new recursivePromiseError(arrayOfResults, error);
    });
}

export function recursivePromise<T>(arrayOfPromises: Array<Promise<T>>) {
  return new Promise((resolve, reject) => {
    returnPromiseResult(arrayOfPromises)
      .then((data) => {
        console.log("RESOLVED", data);
        resolve(data);
      })
      .catch((err) => {
        console.log("ERROR", err);
        reject(err);
      });
  });
}

class recursivePromiseError extends Error {
  public results = [];
  constructor(results, ...error) {
    super(...error);
    this.results = results;
  }
}
