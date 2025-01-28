import { Router } from 'express';
import ErrorController from '../controllers/ErrorController.js';

const errorRoutes = new Router();

errorRoutes.get('/', ErrorController.index);

export default errorRoutes;
