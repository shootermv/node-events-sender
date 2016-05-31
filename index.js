const EventEmitter = require('events');
const parser = require('url-parser')
const fs = require('fs');


module.exports = function(path){
  const myEmitter = new EventEmitter();
  

  myEmitter.emit('start');
  
  function readLines(input) {
    var remaining = '';
    input.on('error', (err)=> {
      myEmitter.emit('error');
    })
    input.on('data', (data)=> {        
      let list = data.toString().split('\n');
      list.forEach( line => func(line));          
    });
  
    input.on('end', () =>{
      if (remaining.length > 0) {
        func(remaining);
      }
      myEmitter.emit('end');
    });
  }
  
  function  func ( data) { 
    myEmitter.emit('data',data);
    if(!parser.parse(data)){
      myEmitter.emit('data-error');
    }
  }

  fs.watchFile(path, {encoding: 'buffer'}, (event, filename) => {
    readLines(fs.createReadStream(path));
  })
  readLines(fs.createReadStream(path));
  return myEmitter;
}


