import { calculateInThreads } from "./CalculateInThreads";

function calculateMany(times: number = 1000000) {
  let j = 0;
  for (let i = 0; i < times; i++) {
    j = i;
  }
  return j;
}

function calculateManyMore(times: number = 10000000000) {
  let j = 0;
  for (let i = 0; i < times; i++) {
    j = i;
  }
  return j;
}

function showResults(results) {
  console.log("Function callback", results);
  return;
}

calculateInThreads(
  [
    calculateManyMore,
    calculateMany,
    calculateMany,
    calculateManyMore,
    calculateMany,
    calculateMany,
  ],
  (results) => showResults(results)
);

// const calculateRegular = <T>(
//   tasks: Function[],
//   whatDoWithCalculations: (results: Array<T>) => T
// ) => {
//   console.time("bbb");
//   let result = [];
//   for (let i = 0; i < tasks.length; i++) {
//     result.push(tasks[i]());
//   }
//   whatDoWithCalculations(result);
// };

// calculateRegular(
//   [
//     calculateMany1,
//     calculateMany,
//     calculateMany,
//     calculateMany1,
//     calculateMany,
//     calculateMany,
//   ],
//   (results) => {
//     console.log("callback", results);
//     console.timeEnd("bbb");
//     return
//   }
// );
