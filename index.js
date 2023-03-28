#!/usr/bin/env node

var destoken = require('./dist/src/index.js');

destoken.run({
  rootPath: __dirname,
  from: process.arch[2],
  to: process.arch[3],
});
