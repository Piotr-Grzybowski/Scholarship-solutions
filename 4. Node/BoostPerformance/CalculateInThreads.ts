const cluster = require("cluster");
const totalCPUs = require("os").cpus().length;

const calculateInThreads = <T>(
  tasks: number[],
  whatDoWithCalculations: (results: Array<T>) => T
) => {
  let i: number = 0;
  let results = [];
  let worker;
  if (cluster.isPrimary) {
    console.log(`Number of cpus is ${totalCPUs}`);
    console.log(`Master ${process.pid} is running`);
    let numberOfThreads = i < 4 ? i : 4;
    for (let j = 0; j < 4; j++) {
      worker = cluster.fork(i);
      worker.on("message", function (msg) {
        // we only want to intercept messages that have a chat property
        worker.send({
          chat: "Ok worker, Master got the message! Over and out!",
        });
      });
    }
    cluster.on("fork", (worker) => {
      worker.on("message", (text) => {
        console.log(`${text} from worker ${worker.process.pid}`);
      });
      worker.send({ task: i });
      console.log(`Worker ${worker.process.pid} started ${i}`);
      i++;
    });

    cluster.on("exit", (worker, code, signal) => {
      // console.log(`worker ${worker.process.pid} died`);
      // console.log(`Let's start another one ${i}`);
      if (i < tasks.length) cluster.fork(i);
    });
  } else {
    // results[i] = tasks[i];
    process.on("message", (message) => {
      console.log(message);
      process.send("Took task nr" + i);
    });
    // process.kill(process.pid);
  }
};

function calculateMany(times: number) {
  let j = 0;
  for (let i = 0; i < times; i++) {
    j = i;
  }
  return j;
}

console.log(
  calculateInThreads(
    [
      calculateMany(100001),
      calculateMany(500000),
      calculateMany(100001),
      calculateMany(100001),
      calculateMany(100001),
      calculateMany(100001),
    ],
    (result) => {
      console.log(result);
    }
  )
);
