import slugify from 'slugify';
// import { fileTypeFromFile } from 'file-type';
import { promisify } from 'node:util';
import childProcess from 'node:child_process';

const exec = promisify(childProcess.exec);

export default class ConvertPdfToPdfA {
  constructor(reqFile, reqBody) {
    this.author = reqBody.author;
    this.title = reqBody.title;
    this.keywords = reqBody.keywords;
    this.ocr = reqBody.ocr ? 300 : 0;
    this.originalname = reqFile.originalname;
    this.filename = reqFile.filename;
    this.mimetype = reqFile.mimetype;
    this.size = reqFile.size;
    this.path = reqFile.path;
  }

  validateFileSize() {
    if (this.size > 33554432) {
      throw new Error('File size is bigger than 32MB');
    }
  }

  validateFileTypeFromFilename() {
    if (this.mimetype !== 'application/pdf') {
      throw new Error('Invalid file type (file name is not a pdf)');
    }
  }

  // TODO: Implement this method
  // async validateFileTypeFromFileContent() {
  //   const type = await fileTypeFromFile(this.path);
  //   console.log(type);
  //   if (type.mime !== 'application/pdf') {
  //     this.mimetype = type.mime;
  //     // throw new Error('Invalid file type (file content is not a pdf)');
  //   }
  // }

  slugfyFilename() {
    const slug = slugify(this.originalname.replace('.pdf', ''), {
      lower: true,
      strict: true,
      locale: 'pt',
    });
    this.filename = slug;
  }

  // log() {
  //   console.log(this.author, this.title, this.subject);
  //   console.log(
  //     this.originalname,
  //     this.filename,
  //     this.mimetype,
  //     this.size,
  //     this.path,
  //   );
  // }

  // async execute() {
  //   try {
  //     await exec(
  //       `ocrmypdf ${this.path} processed/${this.filename}.pdfa.pdf --tesseract-timeout=0 --skip-text --skip-big=50 --pdfa-image-compression=lossless --title="${this.title}" --author="${this.author}" --subject="${this.subject}"`,
  //     );
  //   } catch (error) {
  //     console.error(error);
  //     throw error;
  //   }
  // }

  async ocrmypdf() {
    const { stdout, stderr } = await exec(
      // tesseract-timeout=300 means 5 minutes
      `ocrmypdf \
      ${this.ocr ? '--redo-ocr' : '--skip-text'} \
      --tesseract-timeout=${this.ocr} \
      --skip-big=50 \
      --pdfa-image-compression=lossless \
      --language=por+eng+spa \
      --quiet \
      ${this.title ? `--title="${this.title}"` : ''} \
      ${this.author ? `--author="${this.author}"` : ''} \
      ${this.keywords ? `--keywords="${this.keywords}"` : ''} \
      ${this.keywords ? `--subject="${this.keywords}"` : ''} \
      ${this.path} \
      pdfa/${this.filename}.pdfa.pdf`,
    );
    console.log('stdout:', stdout);
    console.error('stderr:', stderr);
  }
}
