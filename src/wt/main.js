import { Worker } from 'worker_threads';
import os from 'os';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const startingNumber = 10;

const performCalculations = async () => {
    const numCPUs = os.cpus().length;
    const workerPath = path.join(__dirname, 'worker.js');
    const results = new Array(numCPUs).fill(null);
    const workerPromises = [];
    for (let i = 0; i < numCPUs; i++) {
        const worker = new Worker(workerPath);
        const numberToSend = startingNumber + i;
        const workerPromise = new Promise((resolve) => {
            worker.once('message', (message) => {
                if (message.error) {
                    resolve({ status: 'error', data: null });
                } else {
                    resolve({ status: 'resolved', data: message.result });
                }
            });
            worker.once('error', () => {
                resolve({ status: 'error', data: null });
            });
            worker.once('exit', (code) => {
                if (code !== 0) {
                    resolve({ status: 'error', data: null });
                }
            });
            worker.postMessage({ n: numberToSend });
        });
        workerPromises.push(workerPromise);
    }
    const computedResults = await Promise.all(workerPromises);
    for (let i = 0; i < computedResults.length; i++) {
        results[i] = computedResults[i];
    }
    console.log(results);
};

await performCalculations();