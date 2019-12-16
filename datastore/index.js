const fs = require('fs');
const path = require('path');
const _ = require('underscore');
const counter = require('./counter');

var items = {};

// Public API - Fix these CRUD functions ///////////////////////////////////////

exports.create = (text, callback) => {
  var id = counter.getNextUniqueId((err, id)=>{
    // var path = path.join(__dirname, 'testData');
    // console.log(__dirname)
    fs.writeFile(`./test/testData/${id}.txt`,text, (err) => {
    if (err) console.log(err);
    items[id] = text;
    callback(null, { id, text });
    })
  });

};

exports.readAll = (callback) => {
  // var result = []
  // var data = _.map(items, (text, id) => {
  //   return { id, text };
  // });
  // // console.log(data)
  // callback(null, data);

};

exports.readOne = (id, callback) => {
  fs.readFile(`./test/testData/${id}.txt`, 'utf8', (err, data) => {
    if(err) {
      callback(new Error(`No item with id: ${id}`));
    }else{
      callback(null, { id: id, text: data });
    }
  })
};

exports.update = (id, text, callback) => {
  // var item = items[id];
  // if (!item) {
  //   callback(new Error(`No item with id: ${id}`));
  // } else {
  //   items[id] = text;
  //   callback(null, { id, text });
  // }

  fs.readFile(`./test/testData/${id}.txt`,"utf8" , (err, data) => {
    if(err) {
      callback(new Error(`No item with id: ${id}`));
    }else{
      fs.writeFile(`./test/testData/${id}.txt`, text, (err) => {
        if(err) {
          callback(new Error(`No item with id: ${id}`));
        }else{
          callback(null, { id: id, text: data });
        }
      })
    }
  })
};

exports.delete = (id, callback) => {
  // var item = items[id];
  // delete items[id];
  // if (!item) {
  //   // report an error if item not found
    // callback(new Error(`No item with id: ${id}`));
  // } else {
    // callback();
  // }

  fs.unlink(`./test/testData/${id}.txt`, (err) => {
    if(err) {
      callback(new Error(`No item with id: ${id}`));
    }else {
      callback();
    }
  })
};

// Config+Initialization code -- DO NOT MODIFY /////////////////////////////////

exports.dataDir = path.join(__dirname, 'data');

exports.initialize = () => {
  if (!fs.existsSync(exports.dataDir)) {
    fs.mkdirSync(exports.dataDir);
  }
};
