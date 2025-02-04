#!/usr/bin/env node

// from de book: Construindo aplicações com NodeJS, 5.4.1
import cluster from 'cluster';
import os from 'os';
import app from '../app.js';
import log from '../utils/logger.js';

const cpus = os.cpus();

const onWorkerError = (code, signal) =>
  log(`Worker died. Code: ${code}, Signal: ${signal}`);

if (cluster.isPrimary) {
  log(`Primary ${process.pid} is running`);

  cpus.forEach(() => {
    const worker = cluster.fork();
    worker.on('error', onWorkerError);
  });

  cluster.on('exit', (worker) => {
    log(`Worker ${worker.process.pid} died`);
    log('Starting a new worker');
    const newWorker = cluster.fork();
    newWorker.on('error', onWorkerError);
  });
} else {
  const server = app.listen(8080, () => {
    log('Server is running on http://localhost:8080');
  });

  server.on('error', (error) => {
    log(error);
  });
}
