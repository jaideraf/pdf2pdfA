# pdf2pdfA

A simple tool to convert PDF files to [PDF/A](https://en.wikipedia.org/wiki/PDF/A) files.

> PDF/A is an ISO-standardized version of the Portable Document Format (PDF) specialized for use in the archiving and long-term preservation of electronic documents. -- <cite>Wikipedia, 2025</cite>

The main pourpose of this tool is to serve as the PDF/A  conversor for theses, dissertations and other university documents for long time preservation.

## Getting the tool
```shell
git clone https://github.com/jaideraf/pdf2pdfA.git && cd pdf2pdfA
```

## Building the image (production)
```shell
docker build --pull -f Dockerfile -t pdf2pdfa:latest .
```

## Running (production)
```shell
docker run --rm -d -p 8080:8080 pdf2pdfa:latest
```

## Running (development)
```shell
npm i
docker build --pull --no-cache --progress=plain -f Dockerfile-dev \
-t pdf2pdfa:latest . 2>&1 | tee build.log
docker run --rm -p 8080:8080 -v ./:/usr/src/app pdf2pdfa:latest
```

## TO DO:
- Change from EJS to Vue or React


