import { Router } from 'express';
import homeRoutes from './home.js';
import downloadRoutes from './download.js';
import errorRoutes from './error.js';
import checkRoutes from './check.js';

const routes = new Router();

routes.use('/', homeRoutes);
routes.use('/download', downloadRoutes);
routes.use('/error', errorRoutes);
routes.use('/check', checkRoutes);

export default routes;
