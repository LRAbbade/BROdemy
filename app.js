const app = require('./config/server');
const cluster = require('cluster');
const numCPUs = require('os').cpus().length;

if (cluster.isMaster) {
    for (let i = 0; i < numCPUs; i++) {
        cluster.fork();
    }
    cluster.on('exit', (worker, code, signal) => {
        console.log(`worker ${worker.process.pid} died`);
    });
} else {
    const port = 8080;
    app.listen(port, function () {
        console.log(`Worker ${process.pid} started`);
        console.log("servidor rodando com Express na porta " + port);
    });
}


