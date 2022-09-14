"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.splitChunkOnCellsFactory = void 0;
const { Transform } = require("stream");
const { EOL } = require("os");
const regexToParseCell = /(?<=^|,)(\"(?:[^"]?|"")*\"*|[^,]*)(?:$|)/g;
const splitChunkOnCellsFactory = () => {
    let fragmentOfChunk = "";
    let lineLength;
    return new Transform({
        objectMode: true,
        transform(chunk, encoding, callback) {
            const splittedChunk = [];
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
};
exports.splitChunkOnCellsFactory = splitChunkOnCellsFactory;
