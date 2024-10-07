import fs from 'node:fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const fileToRemove = 'fileToRemove.txt';
const errorFS = Error('FS operation failed');

const remove = async () => {
    const filePath = path.join(__dirname, 'files' ,fileToRemove);

    try {
        await fs.access(filePath, fs.constants.F_OK);
        await fs.unlink(filePath);
    } catch (error) {
        if (error.code === 'ENOENT') {
            throw errorFS;
        }
        throw error;
    }
};

await remove();