export function recursivePromise<T>(
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
      return recursivePromise(arrayOfPromises, ++currentIndex, arrayOfResults);
    })
    .catch((error) => {
      if (!(error instanceof recursivePromiseError)) {
        throw new recursivePromiseError(arrayOfResults, error);
      }
      throw error;
    });
}

class recursivePromiseError extends Error {
  public results;
  constructor(results, ...error) {
    super(...error);
    this.results = results;
  }
}
