// (A) FILE SYSTEM + READ LINE MODULES
const rl = require("readline");

// (B) FILE STREAM
const reader = rl.createInterface({
  input: fs.createReadStream("./assets/test.csv"),
});

// (C) READ LINE-BY-LINE INTO ARRAY
var arr = [];
let i = 0;
const regex = new RegExp(
  /(?:,|\n|^)("(?:(?:"")*[^"]*)*"|[^",\n]*|(?:\n|$))/,
  "g"
);
reader.on("line", (row) => {
  //if (row.split(',').length ===)
  i++;
  console.log("before working", i);
  console.log(regex.test(row), i);
  if (regex.test(row)) {
    arr.push(row.split(regex));
  }
  return row;
  // console.log(arr[arr.length - 1]);
});
reader.on("error", (error) => {
  console.log(error);
});
// (D) DONE - FULL ARRAY
reader.on("close", () => {
  console.log(arr[1].length);
  console.log(arr[1]);
});
