import express from 'express';
import favicon from 'serve-favicon';
import multer from 'multer';
import path from 'path';
import { OcrMyPdf } from 'ocrmypdf-js';
import { promises as fs } from 'fs';

const app = express();

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(favicon(path.join('public', 'cropped-favicon-32x32.png')));

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(
      null,
      `${file.originalname.replace('.pdf', '')}-${Date.now()}${path.extname(file.originalname)}`,
    );
  },
});

const upload = multer({ storage });

app.get('/', (req, res) => {
  res.render('index');
});

app.post('/upload', upload.single('file'), async (req, res) => {
  const author = req.body.author || '';
  const title = req.body.title || '';
  const subject = req.body.subject || '';
  const filePath = req.file.path;
  const pdfa = `${req.file.originalname.replace('.pdf', '.pdfa')}.pdf`;

  const generatePdfA = async () => {
    const ocrmypdf = new OcrMyPdf();
    try {
      await ocrmypdf.execute({
        inputPath: req.file.path,
        outputPath: `processed/${pdfa}`,
        args: [
          '--tesseract-timeout=0',
          '--skip-text',
          '--pdfa-image-compression=lossless',
          `--title="${title}"`,
          `--author="${author}"`,
          `--subject="${subject}"`,
        ],
      });
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  try {
    await generatePdfA();
    const data = await fs.readFile(`processed/${pdfa}`);
    res.set('Content-Disposition', `attachment; filename="${pdfa}"`);
    res.send(data);
  } catch (err) {
    console.log(err);
    res.render('error');
  }
});

app.get('/upload', (req, res) => {
  res.redirect('/');
});

app.listen(8080, () => {
  console.log('Server is running on port http://localhost:8080');
});
