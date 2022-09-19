import cluster from "cluster";
import { masterProcess } from "./masterProcess/masterProcess";
import { workerProcess } from "./workerProcess/workerProcess";

export const calculateInThreads = <T>(
  tasks: Array<(data?: T) => number>,
  callback: (results: Array<number>) => number | void,
  numberOfThreads: number = 4
) => {
  const parallelProcessesAmount =
    numberOfThreads < tasks.length ? numberOfThreads : tasks.length;

  if (cluster.isPrimary) {
    masterProcess(tasks, callback, parallelProcessesAmount);
  } else {
    workerProcess(tasks);
  }
};
