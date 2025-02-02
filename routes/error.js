import { Router } from 'express';
import ErrorController from '../controllers/ErrorController.js';

const errorRoutes = new Router();

errorRoutes.get('/', ErrorController.index);
errorRoutes.get('/404', ErrorController.notFound);

export default errorRoutes;
