import ConvertPdfToPdfA from './ConvertPdfToPdfA.js';
import log from '../utils/logger.js';

const HomeController = {
  index(req, res) {
    res.render('home', { title: 'Página inicial' });
  },
  async post(req, res) {
    const genPdfA = new ConvertPdfToPdfA(req.file, req.body);

    try {
      genPdfA.validateFileSize();
      genPdfA.validateFileTypeFromFilename();

      genPdfA
        .validateFileTypeFromFileContent()
        .then(async () => {
          log('File type from content is valid');
          genPdfA.info();
          try {
            await genPdfA.ocrmypdf();
            res.render('download', {
              pdfaFilePath: `pdfa/${genPdfA.filename}.pdf`,
              pdfaFilename: `${genPdfA.originalname}.pdfa.pdf`,
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
