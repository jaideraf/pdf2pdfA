import { Router } from 'express';
import multer from 'multer';
import UploadController from '../controllers/UploadController.js';

const uploadRoutes = new Router();

const upload = multer({
  dest: 'uploads/',
  // limits: { fileSize: 32 * 1024 * 1024 }, // 30 MB file size limit
});

uploadRoutes.post('/', upload.single('file'), UploadController.index);
uploadRoutes.get('/', UploadController.redirect);

export default uploadRoutes;
