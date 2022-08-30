const { Transform } = require("stream");
const { EOL } = require("os");

let indexesDone = false;
let listedPriceIndex;
let lastSoldPriceIndex;
let differenceBetweenPricesIndex;

export const setIndexesAndAddColumn = new Transform({
  objectMode: true,

  transform(chunk, encoding, callback) {
    const transformedChunk = [];

    if (!indexesDone) {
      const firstLine = chunk[0];
      listedPriceIndex = firstLine.findIndex(
        (element) => element === "Listed Price"
      );
      lastSoldPriceIndex = firstLine.findIndex(
        (element) => element === "Last Sold Price"
      );
      differenceBetweenPricesIndex = firstLine.length;
      chunk[0].push("Difference between Prices");

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

    this.push(transformedChunk.join(EOL));
  },
});
