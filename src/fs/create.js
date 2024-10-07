import fs from 'node:fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const content = 'I am fresh and young';
const fileName = 'fresh.txt';
const errorFS = new Error('FS operation failed');

const create = async () => {
    const filePath = path.join(__dirname, 'files', fileName);

    try {
        await fs.writeFile(filePath, content, { flag: 'wx' });
    } catch (error) {
        if (error.code === 'EEXIST') {
            throw errorFS;
        }
        throw error;
    }
};

await create();
