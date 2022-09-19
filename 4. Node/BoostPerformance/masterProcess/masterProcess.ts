import cluster from "cluster";
import { workerMessage } from "./types";

export function masterProcess<T>(
  tasks: Array<(data?: T) => number>,
  callback: (results: Array<number>) => number | void,
  numberOfThreads: number
) {
  let indexOfTaskToDo: number = 0;
  let results: Array<number> = [];
  let amountOfCores =
    numberOfThreads > 4 && tasks.length >= 4 ? 4 : numberOfThreads;

  // Create a few workers
  for (let counter = 0; counter < amountOfCores; counter++) {
    cluster.fork({ jobToDo: indexOfTaskToDo });
    indexOfTaskToDo++;
  }

  cluster.on("fork", (worker) => {
    worker.on("message", (message: workerMessage) => {
      results[message.index] = message.result;
    });
  });

  cluster.on("exit", (worker, code, signal) => {
    if (indexOfTaskToDo < tasks.length) {
      cluster.fork({ jobToDo: indexOfTaskToDo });
      indexOfTaskToDo++;
    }
    if (Object.keys(cluster.workers).length === 0) {
      callback(results);
    }
  });
}
