import { promisify } from 'node:util';
import { jest } from '@jest/globals';
import ConvertPdfToPdfA from '../controllers/ConvertPdfToPdfA.js';
import log from '../utils/logger.js';

jest.mock('node:util');
jest.mock('node:child_process');
jest.mock('../utils/logger.js');

const exec = jest.fn();

describe('ConvertPdfToPdfA', () => {
  const reqFile = {
    originalname: 'test.pdf',
    filename: 'testfile',
    mimetype: 'application/pdf',
    size: 1024,
    path: './example/pdf-example.pdf',
  };

  const reqBody = {
    title: 'Test Title',
    author: 'Test Author',
    keywords: 'test, pdf',
    ocr: true,
  };

  let converter;

  beforeEach(() => {
    converter = new ConvertPdfToPdfA(reqFile, reqBody);
  });

  test('constructor initializes properties correctly', () => {
    expect(converter.title).toBe(reqBody.title);
    expect(converter.author).toBe(reqBody.author);
    expect(converter.keywords).toBe(reqBody.keywords);
    expect(converter.ocr).toBe(300);
    expect(converter.originalname).toBe('test');
    expect(converter.filename).toBe(reqFile.filename);
    expect(converter.mimetype).toBe(reqFile.mimetype);
    expect(converter.size).toBe(reqFile.size);
    expect(converter.path).toBe(reqFile.path);
  });

  test('validateFileSize throws error if file size is bigger than limit', () => {
    expect(() => converter.validateFileSize(512)).toThrow('File size is bigger than the limit');
  });

  test('validateFileTypeFromFilename throws error if file type is not pdf', () => {
    converter.mimetype = 'application/zip';
    expect(() => converter.validateFileTypeFromFilename()).toThrow('Invalid file type (file name is not a pdf)');
  });

});
