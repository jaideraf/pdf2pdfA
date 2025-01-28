import { Router } from 'express';
import HomeController from '../controllers/HomeController.js';

const homeRoutes = new Router();

homeRoutes.get('/', HomeController.index);

export default homeRoutes;
