const { pipeline } = require('stream');
const fs = require('fs');
const csv = require('csvtojson');
const csvFilePath = './src/task-2/task-2-2/csv/nodejs-hw1-ex1.csv';
const txtFilePath = './src/task-2/task-2-2/csv/nodejs-hw1-ex1.txt';
const csvReadSettings = {
  noheader: false,
  headers: ['book', 'author', 'amount', 'price'],
  delimiter: 'auto',
  trim: true,
  ignoreEmpty: true,
  colParser: {
    amount: 'omit',
    price: function (item) {
      return Number(item.replace(',', '.'));
    }
  },
  checkType: true
};

// Method 1: Load file line by line

const getLineByLine = async () => {
  const writeStream = fs.createWriteStream(txtFilePath);
  const onError = (err) => {
    console.log(err);
  };
  const onComplete = () => {
    console.log('Success!!!');
  };
  csv(csvReadSettings)
    .fromFile(csvFilePath)
    .subscribe(
      (json, lineNumber) => {
        writeStream.write(JSON.stringify(json) + '\n');
      },
      onError,
      onComplete
    );
};

// Method 2: Load full file to RAM

const getFullyLoaded = async () => {
  const readStream = fs.createReadStream(csvFilePath);
  const writeStream = fs.createWriteStream(txtFilePath);

  pipeline(readStream, csv(csvReadSettings), writeStream, (err) => {
    if (err) {
      console.log('Pipeline failed', err);
    } else {
      console.log('Pipeline succeeded!!!');
    }
  });
};

getLineByLine();

// getFullyLoaded();
