import fs from 'node:fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const sourceFolder = 'files';
const destinationFolder = 'files_copy';
const errorFS = Error('FS operation failed');

const copy = async () => {
    const sourcePath = path.join(__dirname, sourceFolder);
    const destinationPath = path.join(__dirname, destinationFolder);

    try {
        // сhecks if the source folder exists
        await fs.access(sourcePath); 
        // copies the source folder to the destination folder
        await fs.cp(sourcePath, destinationPath, { recursive: true, errorOnExist: true, force: false }); 
    } catch (error) {
        if (['ENOENT', 'ERR_FS_CP_EEXIST'].includes(error.code)) {
            throw errorFS;
        }
        throw error;
    }
};

await copy();
