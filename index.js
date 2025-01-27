import express from 'express';
import favicon from 'serve-favicon';
import multer from 'multer';
import { promises as fs } from 'fs';
import ConvertPdfToPdfA from './ConvertPdfToPdfA.js';
import e from 'express';

const app = express();

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(favicon('public/img/cropped-favicon-32x32.png'));

app.get('/', (req, res) => {
  res.render('home');
});

const upload = multer({
  dest: 'uploads/',
  // limits: { fileSize: 32 * 1024 * 1024 }, // 30 MB file size limit
});

app.post('/upload', upload.single('file'), async (req, res) => {
  const genPdfA = new ConvertPdfToPdfA(req.file, req.body);

  try {
    genPdfA.validateFileSize();
    genPdfA.validateFileTypeFromFilename();
    // genPdfA.validateFileTypeFromFileContent(); TODO: Implement this method
    genPdfA.slugfyFilename();

    try {
      await genPdfA.ocrmypdf();
      const data = await fs.readFile(`processed/${genPdfA.filename}.pdfa.pdf`);
      res.set(
        'Content-Disposition',
        `attachment; filename="${genPdfA.filename}.pdfa.pdf"`,
      );
      res.send(data);
    } catch (error) {
      console.error(error);
      res.redirect('error');
    }
  } catch (error) {
    console.error(error);
    res.redirect('/error');
  }
});

app.get('/upload', (req, res) => {
  res.redirect('/');
});

app.get('/error', (req, res) => {
  res.render('error');
});

app.use((req, res, next) => {
  const err = new Error('404: Page Not Found');
  err.status = 404;
  next(err);
});

app.use((err, req, res, next) => {
  if (err.status !== 404) console.log(err.stack);
  res.status(err.status || 500).json({ error: err.message });
});

app.listen(8080, () => {
  console.log('Server is running on http://localhost:8080');
});
