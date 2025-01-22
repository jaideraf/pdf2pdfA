import express from 'express';
import favicon from 'serve-favicon';
import multer from 'multer';
import { OcrMyPdf } from 'ocrmypdf-js';
import { promises as fs } from 'fs';
import ConvertPdfToPdfA from './ConvertPdfToPdfA.js';

const app = express();

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(favicon('public/img/cropped-favicon-32x32.png'));

app.get('/', (req, res) => {
  res.render('home');
});

const upload = multer({ dest: 'uploads/' });

app.post('/upload', upload.single('file'), async (req, res) => {
  // const { author, title, subject } = req.body;
  // const { originalname, filename, mimetype, size, path: filepath } = req.file;

  const genPdfA = new ConvertPdfToPdfA(req.file, req.body);

  try {
    genPdfA.validateFileTypeFromFilename();
    genPdfA.validateFileTypeFromContent();
    genPdfA.validateFileSize();
  } catch (error) {
    console.log(error);
    res.redirect('/error');
    return;
  }

  console.log('cheguei aqui');
  // genPdfA.slugfyFilename();
  // console.log(genPdfA.filename);
  // genPdfA.log();
  res.render('home');

  // console.log(
  //   originalname,
  //   filename,
  //   mimetype,
  //   size,
  //   filepath,
  //   author,
  //   title,
  //   subject,
  // );

  // const generatePdfA = async () => {
  //   const ocrmypdf = new OcrMyPdf();
  //   try {
  //     await ocrmypdf.execute({
  //       inputPath: req.file.path,
  //       outputPath: `processed/${pdfa}`,
  //       args: [
  //         '--tesseract-timeout=0',
  //         '--skip-text',
  //         '--skip-big=50',
  //         '--pdfa-image-compression=lossless',
  //         `--title="${title}"`,
  //         `--author="${author}"`,
  //         `--subject="${subject}"`,
  //       ],
  //     });
  //   } catch (error) {
  //     console.log(error);
  //     throw error;
  //   }
  // };

  // try {
  //   await generatePdfA();
  //   const data = await fs.readFile(`processed/${pdfa}`);
  //   res.set('Content-Disposition', `attachment; filename="${pdfa}"`);
  //   res.send(data);
  // } catch (err) {
  //   console.log(err);
  //   res.render('error');
  // }
});

app.get('/upload', (req, res) => {
  res.redirect('/');
});

app.get('/error', (req, res) => {
  res.render('error');
});

app.listen(8080, () => {
  console.log('Server is running on port http://localhost:8080');
});
