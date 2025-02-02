import log from '../utils/logger.js';
import ConvertPdfToPdfA from './ConvertPdfToPdfA.js';
import deleteOldPDFs from '../utils/deleteOldPDFs.js';

const fileSizeLimit = 33554432; // 32MB

const HomeController = {
  index(req, res) {
    res.render('home', { title: 'Página inicial' });
  },
  async post(req, res) {
    const genPdfA = new ConvertPdfToPdfA(req.file, req.body);

    try {
      genPdfA.validateFileSize(fileSizeLimit);
      genPdfA.validateFileTypeFromFilename();

      genPdfA
        .validateFileTypeFromFileContent()
        .then(async () => {
          log('File type from content is valid');
          // genPdfA.info(); // debug
          try {
            await genPdfA.ocrmypdf();
            await deleteOldPDFs();
            res.render('download', {
              pdfaFilePath: `pdfa/${genPdfA.filename}.pdf`,
              pdfaFilename: `${genPdfA.originalname}-pdfa.pdf`,
            });
          } catch (error) {
            log(error);
            res.redirect('/error');
          }
        })
        .catch((error) => {
          log(error);
          res.redirect('/error');
        });
    } catch (error) {
      log(error);
      res.redirect('/error');
    }
  },
};

export default HomeController;
