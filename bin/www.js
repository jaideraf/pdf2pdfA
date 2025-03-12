#!/usr/bin/env node
/*
  pdf2pdfA - A service tool to convert PDF files to PDF/A

  The server is created with the Express framework, it uses the Multer
  middleware to handle file uploads, and the ocrmypdf library to convert the
  PDF files to PDF/A.

  The following restrictions apply to the PDF files that can be converted to:
  - The file must be a PDF file.
  - The file must not be above 32 MB.
  - The file must not have digital signatures.

  The folowing code is the entry point of the application, it creates a cluster
  of workers to take advantage of multi-core processors. The number of workers
  is equal to the number of CPU cores available on the machine.

  The primary process creates the workers and listens for the exit event to
  start a new worker. The workers create an instance of the Express server and
  listen on port 8080.

  Author: jaideraf <jaideraf@gmail.com>
  Date: 2025-02-22
*/

// from the book: Construindo aplicações com NodeJS, 5.4.1
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
