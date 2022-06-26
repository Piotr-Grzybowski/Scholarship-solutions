export const promiseAll = <T>(arrayOfPromises: Array<Promise<T>>) => {
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

export const promiseAllAsync = <T>(arrayOfPromises: Array<Promise<T>>) => {
  let arrayOfResults: Array<T> = [];
  let resolvedPromises = 0;
  return new Promise((resolve, reject) => {
    arrayOfPromises.forEach(async (promise, index) => {
      try {
        const result = await Promise.resolve(promise);
        arrayOfResults[index] = result;
        resolvedPromises++;
        if (resolvedPromises === arrayOfPromises.length)
          resolve(arrayOfResults);
      } catch (err) {
        reject(err);
      }
    });
  });
};

export const promiseRace = <T>(arrayOfPromises: Array<Promise<T>>) => {
  return new Promise((resolve, reject) => {
    arrayOfPromises.forEach((promise) => {
      Promise.resolve(promise)
        .then((result) => {
          resolve(result);
        })
        .catch((err) => {
          reject(err);
        });
    });
  })
};

export const promiseRaceAsync = <T>(arrayOfPromises: Array<Promise<T>>) => {
  return new Promise((resolve, reject) => {
    arrayOfPromises.forEach(async (promise) => {
      try {
        const result = await Promise.resolve(promise);
        resolve(result);
      } catch (err) {
        reject(err);
      }
    });
  });
};

export const promiseIgnoreErrors = <T>(arrayOfPromises: Array<Promise<T>>) => {
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
        .catch((err) => {
          resolvedPromises++;
          if (resolvedPromises === arrayOfPromises.length)
            resolve(arrayOfResults);
        });
    });
  });
};

export const promiseIgnoreErrorsAsync = <T>(
  arrayOfPromises: Array<Promise<T>>
) => {
  let arrayOfResults: Array<T> = [];
  let resolvedPromises = 0;
  return new Promise((resolve, reject) => {
    arrayOfPromises.forEach(async (promise, index) => {
      try {
        const result = await Promise.resolve(promise);
        arrayOfResults[index] = result;
        resolvedPromises++;
        if (resolvedPromises === arrayOfPromises.length)
          resolve(arrayOfResults);
      } catch (err) {
        resolvedPromises++;
        if (resolvedPromises === arrayOfPromises.length)
          resolve(arrayOfResults);
      }
    });
  });
};

export const promiseLast = <T>(arrayOfPromises: Array<Promise<T>>) => {
  let counter: number = 0;
  let error: T;
  return new Promise((resolve, reject) => {
    arrayOfPromises.forEach((promise) => {
      Promise.resolve(promise)
        .then((result) => {
          counter++;
          if (counter === arrayOfPromises.length) {
            if (error) reject(error);
            resolve(result);
          }
        })
        .catch((err) => {
          counter++;
          if (counter === arrayOfPromises.length) reject(err);
        });
    });
  });
};

export const promiseLastAsync = <T>(arrayOfPromises: Array<Promise<T>>) => {
  let counter: number = 0;
  let error: T;
  return new Promise((resolve, reject) => {
    arrayOfPromises.forEach(async (promise) => {
      try {
        const result = await Promise.resolve(promise);
        counter++;
        if (counter === arrayOfPromises.length) {
          if (error) reject(error);
          resolve(result);
        }
      } catch (err) {
        counter++;
        if (counter === arrayOfPromises.length) reject(err);
      }
    });
  });
};
