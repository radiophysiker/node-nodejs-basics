import fs from 'fs';
import path from 'path';
import zlib from 'zlib';
import { pipeline } from 'stream/promises';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const decompress = async () => {
    const inputFilePath = path.join(__dirname, 'files', 'archive.gz');
    const outputFilePath = path.join(__dirname, 'files', 'fileToCompress.txt');

    try {
        await fs.promises.access(inputFilePath, fs.constants.F_OK);
    } catch (err) {
        console.error('File not found');
        return;
    }

    try {
        const source = fs.createReadStream(inputFilePath);
        const gunzip = zlib.createGunzip();
        const destination = fs.createWriteStream(outputFilePath);

        console.log(`Start decompress ${inputFilePath} in ${outputFilePath}...`);
        await pipeline(
            source,
            gunzip,
            destination
        );
        console.log(`File ${inputFilePath} has been decompressed to ${outputFilePath}`);
    } catch (error) {
        console.error('An error occurred while decompressing the file:', error);
    }

};

await decompress();