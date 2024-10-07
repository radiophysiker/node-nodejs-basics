import fs from 'node:fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const fileToRead = 'fileToRead.txt';

const errorFS = Error('FS operation failed');

const read = async () => {
    const filePath = path.join(__dirname, 'files', fileToRead);

    try {
        await fs.access(filePath, fs.constants.F_OK);
        const content = await fs.readFile(filePath, 'utf-8');
        console.log(content);
    } catch (error) {
        if (error.code === 'ENOENT') {
            throw errorFS;
        }
        throw error;
    }
};

await read();