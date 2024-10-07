import fs from 'fs';
import path from 'path';
import zlib from 'zlib';
import { fileURLToPath } from 'url';
import { pipeline } from 'node:stream/promises';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const compress = async () => {
    const inputFilePath = path.join(__dirname, 'files', 'fileToCompress.txt');
    const outputFilePath = path.join(__dirname, 'files', 'archive.gz');
    try {
        const source = fs.createReadStream(inputFilePath);
        const destination = fs.createWriteStream(outputFilePath);
        const gzip = zlib.createGzip();

        console.log(`Start compress  ${inputFilePath} in ${outputFilePath}...`);
        await pipeline(
            source,
            gzip,
            destination
        );
        console.log(`File ${inputFilePath} has been compressed to ${outputFilePath}`);
    } catch (error) {
        console.error('An error occurred while compressing the file:', error);
    }
};

await compress();