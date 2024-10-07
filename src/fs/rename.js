import fs from 'node:fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const wrongFilename = 'wrongFilename.txt';
const properFilename = 'properFilename.md';
const errorFS = Error('FS operation failed');

const rename = async () => {
    const wrongFilePath = path.join(__dirname, 'files', wrongFilename);
    const properFilePath = path.join(__dirname, 'files', properFilename);

    try {
        await fs.access(wrongFilePath);
        await fs.access(properFilePath);
        throw errorFS;
    } catch (error) {
        if (error.code === 'ENOENT' && error.path === wrongFilePath) {
            throw errorFS;
        }
        if (error.code === 'ENOENT') {
            // renames the file from wrongFilename.txt to properFilename.md
            fs.rename(wrongFilePath, properFilePath);
        } else {
            throw error;
        }
    }
};

await rename();