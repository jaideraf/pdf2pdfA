// import { promises as fs } from 'fs';
import log from '../utils/logger.js';
import ConvertPdfToPdfA from './ConvertPdfToPdfA.js';

const UploadController = {
  async index(req, res) {
    const genPdfA = new ConvertPdfToPdfA(req.file, req.body);

    try {
      genPdfA.validateFileSize();
      genPdfA.validateFileTypeFromFilename();
      // genPdfA.validateFileTypeFromFileContent(); TODO: Implement this method
      genPdfA.slugfyFilename();

      try {
        await genPdfA.ocrmypdf();
        // await fs.readFile(`public/pdfa/${genPdfA.filename}.pdfa.pdf`);
        res.render('download', {
          pdfaFilePath: `pdfa/${genPdfA.filename}.pdfa.pdf`,
          pdfaFilename: `${genPdfA.filename}.pdfa.pdf`,
        });
      } catch (error) {
        log(error);
        res.redirect('/error');
      }
    } catch (error) {
      log(error);
      res.redirect('/error');
    }
  },
  redirect(req, res) {
    res.redirect('/');
  },
};

export default UploadController;
