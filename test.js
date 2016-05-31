const x = require('./index.js');
  myEmitter= x('urls.txt');
  myEmitter.on('start', () => {
    console.log('will read file');
  });
  myEmitter.on('data', (url) => {
    console.log('valid line - ', url);
  });
  myEmitter.on('data-error', () => {
    console.log('error prsing!!!');
  });
  myEmitter.on('error', () => {
    console.log('read file error!!!');
  });
  myEmitter.on('end', () => {
    console.log('reading ended!!');
  });

