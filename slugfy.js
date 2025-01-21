import slugify from 'slugify';

console.log(
  slugify('Código de Catalogação Anglo-Americano (AACR2r) (2004)-2.pdf', {
    lower: true,
    strict: true,
    locale: 'pt',
  }),
);
