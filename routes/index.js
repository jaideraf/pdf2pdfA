import { Router } from 'express';
import homeRoutes from './home.js';
import downloadRoutes from './download.js';
import errorRoutes from './error.js';

const routes = new Router();

routes.use('/', homeRoutes);
routes.use('/download', downloadRoutes);
routes.use('/error', errorRoutes);

export default routes;
