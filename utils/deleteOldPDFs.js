/* eslint-disable no-await-in-loop */
import { readdir, stat, unlink } from 'fs/promises';
import { join } from 'path';
import log from './logger.js';

const folderPaths = ['./uploads', './public/pdfa'];

async function deleteOldPDFsFromFolder(folderPath) {
  try {
    const files = await readdir(folderPath);
    const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD format

    for (const file of files) {
      const filePath = join(folderPath, file);
      const stats = await stat(filePath);
      const creationDate = stats.mtime.toISOString().split('T')[0];

      if (creationDate !== today) {
        await unlink(filePath);
        log(
          `🗑️ Deleted: ${file} (created on ${creationDate}) in ${folderPath}`,
        );
      } else {
        log(`✅ Kept: ${file} (created today) in ${folderPath}`);
      }
    }
  } catch (error) {
    log(`❌ Error processing folder ${folderPath}:`, error);
  }
}

export default async function deleteOldPDFs() {
  for (const folderPath of folderPaths) {
    log(`📂 Processing folder: ${folderPath}`);
    await deleteOldPDFsFromFolder(folderPath);
  }
}
