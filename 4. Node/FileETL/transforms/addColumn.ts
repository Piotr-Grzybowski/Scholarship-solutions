const { Transform } = require("stream");
const { EOL } = require("os");

let indexesDone = false;
let listedPriceIndex;
let lastSoldPriceIndex;
let differenceBetweenPricesIndex;

export const addColumn = new Transform({
  objectMode: true,

  transform(chunk, encoding, callback) {
    const transformedChunk = [];

    // set indexes only once
    if (!indexesDone) {
      const firstLine = chunk[0];
      listedPriceIndex = firstLine.findIndex(
        (element) => element === "Listed Price"
      );
      lastSoldPriceIndex = firstLine.findIndex(
        (element) => element === "Last Sold Price"
      );
      differenceBetweenPricesIndex = firstLine.length;

      // add header for the extra column
      chunk[0].push("Difference between Prices");

      // push line with headers and remove it from original chunk
      transformedChunk.push(chunk.splice(0, 1));

      indexesDone = true;
    }

    for (let line of chunk) {
      const listedPrice = parseInt(line[listedPriceIndex]);
      const lastSoldPrice = parseInt(line[lastSoldPriceIndex]);

      line[differenceBetweenPricesIndex] =
        Math.abs(listedPrice - lastSoldPrice) || `Hasn't been sold yet`;

      transformedChunk.push(line.join());
    }

    callback(null, transformedChunk.join(EOL) + EOL);
  },
});
