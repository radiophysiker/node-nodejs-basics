import { parentPort } from 'worker_threads';

// n should be received from main thread
const nthFibonacci = (n) => n < 2 ? n : nthFibonacci(n - 1) + nthFibonacci(n - 2);

const handleMessage = (data) => {
    const { n } = data;
    try {
        const result = nthFibonacci(n);
        parentPort.postMessage({ result });
    } catch (error) {
        parentPort.postMessage({ error: error.message });
    }
};

parentPort.on('message', handleMessage);