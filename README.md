# pdf2pdfA

A simple tool to convert PDF files to PDF/A files. It is intended to replace http://pdfa.bu.ufsc.br/

## Getting the tool

```
git clone https://github.com/jaideraf/pdf2pdfA.git && cd pdf2pdfA
```

## Building the image (production)

```
docker build --pull -f Dockerfile -t pdf2pdfa:latest .
```

## Running (production)

```
docker run --rm -d -p 8080:8080 pdf2pdfa:latest
```

## Running (development)

```
npm i
docker build --pull --no-cache --progress=plain -f Dockerfile-dev \
-t pdf2pdfa:latest . 2>&1 | tee build.log
docker run --rm -p 8080:8080 -v ./:/usr/src/app pdf2pdfa:latest
```

## TO DO:

- Change from EJS to Vue or React
- Include a link to the source code in the footer

