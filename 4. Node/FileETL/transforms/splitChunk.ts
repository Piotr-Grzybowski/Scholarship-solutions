const { Transform } = require("stream");
const { EOL } = require("os");

let fragments = [];
let lineLength;
let counter = 1;

export const splitChunk = new Transform({
  objectMode: true,
  transform(chunk, encoding, callback) {
    console.log(fragments);
    const splittedChunk = [];
    const regexToSplitByComma = /,(?=(?:(?:[^"]*"){2})*[^"]*$)/g;
    const anotherRegex = /(?:,|\n|^)("(?:(?:"")*[^"]*)*"|[^",\n]*|(?:\n|$))/g;
    const maybeLastRegex = /(?<=^|,)(?:[^,"]+|")?(?=,|$)|(?<=^|,)".*?"(?=,|$)/g;
    if (!lineLength) {
      lineLength = chunk.toString().split(EOL)[0].match(maybeLastRegex).length;
    }
    console.log("asdasd");
    let currentChunk = chunk
      .toString()
      .split(EOL)
      .join(",")
      .match(maybeLastRegex);
    console.log(fragments);
    // if (fragments.length > 0) {
    //   splittedChunk.push([
    //     ...fragments[0],
    //     currentChunk.splice(0, lineLength - fragments[0].length),
    //   ]);
    //   fragments = [];
    // }
    while (currentChunk.length >= lineLength) {
      splittedChunk.push(currentChunk.splice(0, lineLength));
    }
    console.log(lineLength, counter);
    fragments.push(currentChunk);
    counter++;

    console.log("last episode", fragments);
    this.push(splittedChunk);
    callback();
  },
});
