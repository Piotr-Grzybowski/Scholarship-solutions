export function workerProcess<T>(tasks: Array<(data?: T) => number>): void {
  console.log(process.env.jobToDo);
  process.send({
    result: tasks[parseInt(process.env.jobToDo)](),
    index: process.env.jobToDo,
  });
  process.kill(process.pid);
}
