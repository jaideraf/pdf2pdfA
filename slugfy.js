import slugify from 'slugify';

console.log(
  slugify('Código de Catalogação Anglo-Americano (AACR2r) (2004)-2.pdf', {
    lower: true,
    strict: true,
    locale: 'pt',
  }),
);

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, 'uploads/');
//   },
//   filename: (req, file, cb) => {
//     cb(
//       null,
//       `${file.originalname.replace('.pdf', '')}-${Date.now()}${path.extname(file.originalname)}`,
//     );
//   },
// });
