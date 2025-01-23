import slugify from 'slugify';
import { fileTypeFromFile } from 'file-type';

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

  async validateFileTypeFromContent() {
    const type = await fileTypeFromFile(this.path);
    console.log(type);
    if (type.mime !== 'application/pdf') {
      this.mimetype = type.mime;
      // throw new Error('Invalid file type (file content is not a pdf)');
    }
  }

  slugfyFilename() {
    const slug = slugify(this.originalname, {
      lower: true,
      strict: true,
      locale: 'pt',
    });
    this.filename = `${slug}.pdf`;
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
}
