# pdf2pdfA

A simple tool to convert PDF files to PDF/A files. It is intended to replace http://pdfa.bu.ufsc.br/

## Getting the tool

TO DO: Change later

```
git clone https://github.com/jaideraf/pdf2pdfA.git && cd pdf2pdfA
```

## Building the image

```
docker build --pull --rm -f 'Dockerfile' -t 'pdf2pdfa:latest' '.'
```

## Running (production)

```
docker run --rm -p 8080:8080 pdf2pdfa:latest
```

## Developing

```
docker build --pull --rm  --no-cache --progress=plain -f Dockerfile-dev -t pdf2pdfa:latest . 2>&1 | tee build.log
docker run --rm -p 8080:8080 -v ./:/usr/src/app pdf2pdfa:latest
```

## TO DO:

- Optimize Docker image
- Change from EJS to Vue or React
- Include a link to the source code in the footer

