import { Router } from 'express';
import checkRoutes from './check.js';
import downloadRoutes from './download.js';
import errorRoutes from './error.js';
import homeRoutes from './home.js';

const routes = new Router();

routes.use('/', homeRoutes);
routes.use('/download', downloadRoutes);
routes.use('/error', errorRoutes);
routes.use('/check', checkRoutes);

export default routes;
