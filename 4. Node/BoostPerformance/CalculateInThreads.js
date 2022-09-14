var cluster = require("cluster");
var totalCPUs = require("os").cpus().length;
var calculateInThreads = function (tasks, whatDoWithCalculations) {
    if (cluster.isPrimary) {
        console.log("Number of cpus is ".concat(totalCPUs));
        console.log("Master ".concat(process.pid, " is running"));
        for (var i = 0; i < totalCPUs; i++) {
            cluster.fork();
        }
        cluster.on("exit", function (worker, code, signal) {
            console.log("worker ".concat(worker.process.pid, " died"));
            console.log("Let's fork another worker");
            cluster.fork();
        });
    }
};
