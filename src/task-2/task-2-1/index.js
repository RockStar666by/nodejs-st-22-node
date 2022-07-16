import { pipeline, Transform } from 'stream';

// Method 1: Reverse string without using Streams

const reverse = () => {
  console.log('Reverse input:');
  process.stdin.on('data', (data) =>
    process.stdout.write(data.reverse() + '\n')
  );
};

// Method 2: Reverse string using Streams

const transform = () => {
  const transformStream = () =>
    new Transform({
      transform(chunk, encoding, callback) {
        const changedData = chunk
          .toString('utf8')
          .trim()
          .split('')
          .reverse()
          .join('');
        callback(null, changedData + '\n\n');
      }
    });
  console.log('Reverse input:');
  pipeline(process.stdin, transformStream(), process.stdout, (err) => {
    if (err) {
      console.log('Pipeline failed', err);
    } else {
      console.log('Pipeline succeeded!!!');
    }
  });
};

transform();

// reverse();
