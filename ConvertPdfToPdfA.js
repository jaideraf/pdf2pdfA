import slugify from 'slugify';
import { fileTypeFromFile } from 'file-type';
import { exec } from 'child_process';

export default class ConvertPdfToPdfA {
  constructor(reqFile, reqBody) {
    this.author = reqBody.author;
    this.title = reqBody.title;
    this.subject = reqBody.subject;
    this.originalname = reqFile.originalname;
    this.filename = reqFile.filename;
    this.mimetype = reqFile.mimetype;
    this.size = reqFile.size;
    this.path = reqFile.path;
  }

  validateFileSize() {
    if (this.size > 20971520) {
      throw new Error('File size is bigger than 20MB');
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

  log() {
    console.log(this.author, this.title, this.subject);
    console.log(
      this.originalname,
      this.filename,
      this.mimetype,
      this.size,
      this.path,
    );
  }

  // async execute() {
  //   try {
  //     await exec(
  //       `ocrmypdf ${this.path} processed/${this.filename}.pdfa.pdf --tesseract-timeout=0 --skip-text --skip-big=50 --pdfa-image-compression=lossless --title="${this.title}" --author="${this.author}" --subject="${this.subject}"`,
  //     );
  //   } catch (error) {
  //     console.log(error);
  //     throw error;
  //   }
  // }
}
