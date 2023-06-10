
const gulp = require('gulp');
const ts = require('gulp-typescript');
const zip = require('gulp-zip');
const copy = require('gulp-copy');


// copy node_modules to dist
gulp.task('copy-node-modules', function () {
    return gulp.src('./node_modules/**/*')
      .pipe(copy('dist'));
  });
  
  // zip the dist directory
  gulp.task('zip', function () {
    return gulp.src('dist/**/*', { nodir: true })
      .pipe(zip('dist.zip'))
      .pipe(gulp.dest('.'));
  });
  
  // default task
  gulp.task('build', gulp.series('copy-node-modules', 'zip'));


