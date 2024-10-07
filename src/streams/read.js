import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { pipeline } from 'node:stream/promises';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const read = async () => {
    const filePath = path.join(__dirname, 'files', 'fileToRead.txt');
    const readableStream = fs.createReadStream(filePath, { encoding: 'utf-8' });
    await pipeline(
        readableStream,
        process.stdout
    );
};

await read();