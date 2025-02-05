// from de book: Construindo aplicações com NodeJS, 8.1

import express from 'express';
import fs from 'fs/promises';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

const checkRoutes = new express.Router();

checkRoutes.get('/version', async (req, res) => {
  // eslint-disable-next-line no-underscore-dangle
  const __dirname = dirname(fileURLToPath(import.meta.url));
  const str = await fs.readFile(
    path.join(__dirname, '../package.json'),
    'utf-8',
  );
  const pkg = JSON.parse(str.toString());
  res.json({
    applicationName: pkg.name,
    versionRelease: pkg.version,
    uptime: process.uptime(),
    nodeVersion: process.version,
  });
});

checkRoutes.get('/status', async (req, res) => res.end('PONG'));

export default checkRoutes;
