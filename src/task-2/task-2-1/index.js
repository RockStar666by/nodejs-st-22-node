const { pipeline, Transform } = require('stream');

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
    console.log(err);
  });
};

module.exports = transform;
