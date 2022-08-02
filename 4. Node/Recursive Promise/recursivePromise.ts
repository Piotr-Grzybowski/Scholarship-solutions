export const recursivePromise = <T>(arrayOfPromises: Array<Promise<T>>) => {
  let arrayOfResults: Array<T> = [];
  let resolvedPromises = 0;
  return new Promise((resolve, reject) => {
    arrayOfPromises.forEach((promise, index) => {
      Promise.resolve(promise)
        .then((result) => {
          arrayOfResults[index] = result;
          resolvedPromises++;
          if (resolvedPromises === arrayOfPromises.length)
            resolve(arrayOfResults);
        })
        .catch((err) => reject(err));
    });
  });
};

function returnPromiseResult(promise, index, resolvedPromises) {
  Promise.resolve(promise)
    .then((result) => {
      returnPromiseResult()
    .catch((err) => reject(err));
}
