import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { pipeline } from 'node:stream/promises';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const write = async () => {
    const filePath = path.join(__dirname, 'files', 'fileToWrite.txt');
    const writableStream = fs.createWriteStream(filePath, { encoding: 'utf-8' });
    await pipeline(
        process.stdin,
        writableStream
    );
};

await write();