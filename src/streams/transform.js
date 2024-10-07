import { Transform } from 'node:stream';
import { pipeline } from 'node:stream/promises';

class ReverseTransform extends Transform {
    constructor(options) {
        super(options);
    }

    _transform(chunk, encoding, callback) {
        try {
            const reversed = chunk.toString().split('').reverse().join('');
            this.push(reversed);
            callback();
        } catch (error) {
            callback(error);
        }
    }
}

const transform = async () => {
    const reverseTransform = new ReverseTransform();
    await pipeline(
        process.stdin,
        reverseTransform,
        process.stdout
    );
};

await transform();