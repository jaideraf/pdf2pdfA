# pdf2pdfA

A simple tool to convert PDF files to [PDF/A](https://en.wikipedia.org/wiki/PDF/A) files.

> PDF/A is an ISO-standardized version of the Portable Document Format (PDF) specialized for use in the archiving and long-term preservation of electronic documents. -- <cite>Wikipedia, 2025</cite>

The main purpose of this tool is to serve as the PDF/A converter for theses, dissertations and other university documents for long-term preservation.

### Getting the tool

```shell
git clone https://codigos.ufsc.br/bu/pdf2pdfa.git && cd pdf2pdfa
```

## Production

### Build the image

```shell
docker build --pull -f Dockerfile -t pdf2pdfa:latest .
```

### Run

```shell
docker run --rm -d -p 8080:8080 pdf2pdfa:latest
```

## Development

### Install dependencies

```shell
npm install
```

### Build the image

```shell
docker build --pull --no-cache --progress plain -f Dockerfile-dev \
-t pdf2pdfa:latest . 2>&1 | tee build.log
```

### Run

```shell
docker run --rm -p 8080:8080 -v ./:/usr/src/app pdf2pdfa:latest
```

### Tests

```shell
npm test
```

## Built upon

- [OCRmyPDF](https://github.com/ocrmypdf/OCRmyPDF) (Tesseract, etc. ), v16.13.0
- [Node.js](https://nodejs.org/) (Express, File-type, EJS, etc.), v24

## License

GNU Affero General Public License v3.0
