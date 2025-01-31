import { Router } from 'express';
import multer from 'multer';
import HomeController from '../controllers/HomeController.js';

const homeRoutes = new Router();

// Multer configuration, limits file size to 32 MB
const upload = multer({
  dest: 'uploads/',
  limits: { fileSize: 32 * 1024 * 1024 },
});

homeRoutes.get('/', HomeController.index);
homeRoutes.post('/', upload.single('file'), HomeController.post);
export default homeRoutes;
