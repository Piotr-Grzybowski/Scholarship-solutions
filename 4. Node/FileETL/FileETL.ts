const { Transform } = require("stream");
const fs = require("fs");
const readLine = require("readline");

const arrayToObject = new Transform({
  readableObjectMode: true,
  writableObjectMode: true,
  transform(chunk, encoding, callback) {
    this.push(chunk.toString().trim().split("/r"));
    console.log(chunk.toString().trim().split("\r")[0]);
    callback();
  },
});

const objectToString = new Transform({
  writableObjectMode: true,
  transform(chunk, encoding, callback) {
    this.push(JSON.stringify(chunk) + "\n");
    callback();
  },
});

readLine
  .createInterface({
    input: fs.createReadStream("./assets/test.csv", {
      highWaterMark: 10 * 1024 * 1024,
    }),
    crlfDelay: Infinity,
  })
  .pipe(arrayToObject)
  .pipe(objectToString)
  .pipe(fs.createWriteStream("./assets/output" + ".csv"))
  .on("finish", () => console.log("Done"));
