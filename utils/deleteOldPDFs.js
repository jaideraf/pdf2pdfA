/*
The `deleteOldPDFsFromFolder` function is an asynchronous function designed to
delete PDF files from a specified folder if they were not created on the current
day. It begins by attempting to read the contents of the folder using the
`readdir` function from the `fs/promises` module, which returns a list of file
names in the folder. The function then gets the current date in the `YYYY-MM-DD`
format.

Next, the function iterates over each file in the folder. For each file, it
constructs the full file path using the `join` function from the `path` module.
It then retrieves the file's statistics using the `stat` function, which
provides metadata about the file, including its modification time (`mtime`). The
modification time is converted to the `YYYY-MM-DD` format to compare it with the
current date.

If the file's creation date does not match the current date, the function
deletes the file using the `unlink` function and logs a message indicating that
the file was deleted, including the file name, creation date, and folder path.
If the file was created on the current date, it logs a message indicating that
the file was kept.
/*

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
