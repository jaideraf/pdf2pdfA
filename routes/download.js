import { Router } from 'express';
import DownloadController from '../controllers/DownloadController.js';

const downloadRoutes = new Router();

downloadRoutes.get('/', DownloadController.index);

export default downloadRoutes;
