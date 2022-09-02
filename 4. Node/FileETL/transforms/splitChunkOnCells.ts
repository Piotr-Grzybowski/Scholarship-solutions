const { Transform } = require("stream");
const { EOL } = require("os");

let fragmentOfChunk = "";
let lineLength;

export const splitChunkOnCells = new Transform({
  objectMode: true,
  transform(chunk, encoding, callback) {
    const splittedChunk = [];
    const regexToParseCell = /(?<=^|,)(\"(?:[^"]?|"")*\"*|[^,]*)(?:$|)/g;

    // set line length only once for a file
    if (!lineLength) {
      lineLength = chunk
        .toString()
        .split(EOL)[0]
        .match(regexToParseCell).length;
    }

    // if anything left from previous chunk
    if (fragmentOfChunk.length > 0) {
      chunk = fragmentOfChunk + chunk.toString();
      fragmentOfChunk = "";
    }

    const currentChunk = chunk.split(EOL).join(",").match(regexToParseCell);

    while (currentChunk.length >= lineLength) {
      splittedChunk.push(currentChunk.splice(0, lineLength));
    }

    fragmentOfChunk = currentChunk.join();
    callback(null, splittedChunk);
  },
});
