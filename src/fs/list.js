import fs from 'node:fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const errorFS = Error('FS operation failed');

const list = async () => {
    const folderPath = path.join(__dirname, 'files');
    try {
        await fs.access(folderPath, fs.constants.F_OK);
        const files = await fs.readdir(folderPath);
        console.log(files);
    } catch (error) {
        if (error.code === 'ENOENT') {
            throw errorFS;
        }
        throw error;
    }
};

await list();