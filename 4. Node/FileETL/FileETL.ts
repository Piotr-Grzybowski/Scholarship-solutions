const fs = require("fs");
const { EOL } = require("os");
const { pipeline } = require("stream/promises");
const { splitChunk } = require("./transforms/splitChunk");
const { setIndexesAndAddColumn } = require("./transforms/setIndexes");

async function transformFile(
  inputFilePath: string,
  outputFilePath: string
): Promise<void> {
  pipeline(
    fs.createReadStream(inputFilePath, {
      encoding: "UTF-8",
      highWaterMark: 10 * 1024 * 1024,
    }),
    await splitChunk,
    await setIndexesAndAddColumn,
    fs.createWriteStream(outputFilePath)
  );
}

transformFile("./assets/test.csv", "./output.csv");
