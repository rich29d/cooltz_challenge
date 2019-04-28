const gulp = require('gulp');
const shell = require('gulp-shell');
const watch = require('gulp-watch');

gulp.task('watch', () => {
  return watch('./app.js', function () {
    gulp
      .src('./app.js', { read: false })
      .pipe(shell(['node app.js']))
  });
})