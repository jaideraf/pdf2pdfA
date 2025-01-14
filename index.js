import express from 'express';
import favicon from 'serve-favicon';
import multer from 'multer';
import path from 'path';

const app = express();

app.set('view engine', 'ejs');
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

// const callOcrMyPdf = async (file) => {
//   const { createWorker } = require('tesseract.js');
//   const worker = createWorker();
//   await worker.load();
//   await worker.loadLanguage('eng');
//   await worker.initialize('eng');
//   const { data: { text } } = await worker.recognize(file);
//   await worker.terminate();
//   return text;
// };

app.get('/', (req, res) => {
  res.render('index');
});

app.post('/upload', upload.single('file'), (req, res) => {
  // res.send('File uploaded successfully');
  console.log(req.body);
  console.log(req.file);
  // const text = callOcrMyPdf(req.file.path);
  res.render('submited', { body: req.body, file: req.file });
});

app.get('/submited', (req, res) => {
  res.render('submited');
});

app.listen(8080, () => {
  console.log('Server is running on port http://localhost:8080');
});
