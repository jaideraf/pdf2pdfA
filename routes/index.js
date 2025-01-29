import { Router } from 'express';
import homeRoutes from './home.js';
import uploadRoutes from './upload.js';
import errorRoutes from './error.js';
import downloadRoutes from './download.js';

const routes = new Router();

routes.use('/', homeRoutes);
routes.use('/upload', uploadRoutes);
routes.use('/download', downloadRoutes);
routes.use('/error', errorRoutes);

export default routes;
