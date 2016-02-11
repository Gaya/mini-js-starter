var browserSync = require('browser-sync').create();
var Browserify = require('./browserify');

//initialize browserify
Browserify('./src/index', './dist/', 'bundle.js');

//serve stuff
browserSync.init({
  server: './',
});
