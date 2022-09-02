const fs = require("fs");
const { EOL } = require("os");
const { pipeline } = require("stream/promises");
const { splitChunkOnCells } = require("./transforms/splitChunkOnCells");
const { addColumn } = require("./transforms/addColumn");

function transformFile(inputFilePath: string, outputFilePath: string): void {
  pipeline(
    fs.createReadStream(inputFilePath, {
      encoding: "UTF-8",
      highWaterMark: 10 * 1024 * 1024,
    }),
    splitChunkOnCells,
    addColumn,
    fs.createWriteStream(outputFilePath)
  )
    .then(() => {
      console.log(
        `File ${inputFilePath} has been transformed into file ${outputFilePath} successfully!`
      );
    })
    .catch((error) => {
      console.error(error);
    });
}

transformFile("./assets/test.csv", "./output.csv");
