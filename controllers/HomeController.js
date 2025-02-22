import log from '../utils/logger.js';
import ConvertPdfToPdfA from './ConvertPdfToPdfA.js';
import deleteOldPDFs from '../utils/deleteOldPDFs.js';

const fileSizeLimit = 33554432; // 32MB

const HomeController = {
  index(req, res) {
    res.render('home', { title: 'Página inicial' });
  },
  async post(req, res) {
    const converter = new ConvertPdfToPdfA(req.file, req.body);

    try {
      converter.validateFileSize(fileSizeLimit);
      converter.validateFileTypeFromFilename();
      converter
        .validateFileTypeFromFileContent()
        .then(async () => {
          // log('File type from content is valid');
          // converter.info(); // debug
          try {
            await converter.ocrmypdf();
            await deleteOldPDFs();
            res.render('download', {
              pdfaFilePath: `pdfa/${converter.filename}.pdf`,
              pdfaFilename: `${converter.originalname}-pdfa.pdf`,
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
