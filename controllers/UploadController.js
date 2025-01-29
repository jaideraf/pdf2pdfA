import { promises as fs } from 'fs';
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
        const data = await fs.readFile(`pdfa/${genPdfA.filename}.pdfa.pdf`);
        // res.set(
        //   'Content-Disposition',
        //   `attachment; filename="${genPdfA.filename}.pdfa.pdf"`,
        // );
        // res.send(data);
        res.render('download', { pdfa: data });
      } catch (error) {
        console.error(error);
        res.redirect('/error');
      }
    } catch (error) {
      console.error(error);
      res.redirect('/error');
    }
  },
  redirect(req, res) {
    res.redirect('/');
  },
};

export default UploadController;
