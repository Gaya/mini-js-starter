var fs = require('fs');
var browserify = require('browserify');
var watchify = require('watchify');

module.exports = function(src, dist, name, browserSync) {
  var b = browserify(src, {
    cache: {},
    packageCache: {},
    plugin: [watchify],
  }).transform('babelify', { presets: ['es2015'] });

  //create dir before compiling
  createDir(dist, () => {
    b.on('update', bundle);
    bundle();
  });

  function createDir(dist, cb) {
    fs.exists(dist, (exists) => {
      if (!exists) {
        return fs.mkdir(dist, () => {
          cb();
        });
      }

      cb();
    });
  }

  function bundle() {
    var o = b.bundle()
      .on('error', function browserifyError(err) {
        console.log(err.message);
      })
      .pipe(fs.createWriteStream(dist + name));

    if (browserSync) {
      o.pipe(browserSync.reload({ stream: true }));
    }
  }
};
