import crypto from 'crypto';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const calculateHash = async () => {
    try {
        const filePath = path.join(__dirname, 'files', 'fileToCalculateHashFor.txt');
        const hash = crypto.createHash('sha256');
        const input = fs.createReadStream(filePath);

        for await (const chunk of input) {
            hash.update(chunk);
        }
        const digest = hash.digest('hex');
        console.log(digest);
    } catch (error) {
        console.error(error);
    }
};

await calculateHash();