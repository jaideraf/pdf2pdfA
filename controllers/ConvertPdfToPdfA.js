import { fileTypeFromFile } from 'file-type';
import { promisify } from 'node:util';
import childProcess from 'node:child_process';
import log from '../utils/logger.js';

const exec = promisify(childProcess.exec);

export default class ConvertPdfToPdfA {
  constructor(reqFile, reqBody) {
    this.title = reqBody.title;
    this.author = reqBody.author;
    this.keywords = reqBody.keywords;
    this.ocr = reqBody.ocr ? 300 : 0;
    this.originalname = reqFile.originalname.replace('.pdf', '');
    // handle special characters
    this.originalname = Buffer.from(this.originalname, 'ascii').toString(
      'utf8',
    );
    this.filename = reqFile.filename;
    this.mimetype = reqFile.mimetype;
    this.size = reqFile.size;
    this.path = reqFile.path;
  }

  // check if file size is bigger than the limit
  validateFileSize(limit) {
    if (this.size > limit) {
      throw new Error('File size is bigger than the limit');
    }
  }

  // check if file name is a pdf
  validateFileTypeFromFilename() {
    if (this.mimetype !== 'application/pdf') {
      throw new Error('Invalid file type (file name is not a pdf)');
    }
  }

  // check if file content is a pdf
  async validateFileTypeFromFileContent() {
    const type = await fileTypeFromFile(this.path);
    if (type.mime !== 'application/pdf') {
      this.mimetype = type.mime;
      throw new Error('Invalid file type (file content is not a pdf)');
    }
  }

  // convert pdf to pdfa
  async ocrmypdf() {
    const { stdout, stderr } = await exec(
      // tesseract-timeout=300 means 5 minutes, 0 disables OCR (v16.13.0),
      // --ocr-engine=none disables OCR (v17.2.0)
      `ocrmypdf --mode=${this.ocr ? 'redo' : 'skip'} \
      ${this.ocr ? `--tesseract-timeout=${this.ocr}` : '--ocr-engine=none'} \
      --skip-big=50 \
      --pdfa-image-compression=lossless \
      --language=por+eng+spa \
      --quiet \
      ${this.title ? `--title="${this.title}"` : ''} \
      ${this.author ? `--author="${this.author}"` : ''} \
      ${this.keywords ? `--keywords="${this.keywords}"` : ''} \
      ${this.keywords ? `--subject="${this.keywords}"` : ''} \
      ${this.path} \
      public/pdfa/${this.filename}.pdf`,
    );
    log(stdout, stderr);
  }

  // show info about the request body and file
  info() {
    log('Body: ', this.title, this.author, this.keywords, this.ocr);
    log(
      'File: ',
      this.originalname,
      this.filename,
      this.mimetype,
      this.size,
      this.path,
    );
  }
}
