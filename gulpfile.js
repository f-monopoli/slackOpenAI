const gulp = require('gulp');
const del = require('del');
const install = require('gulp-install');
const gulpzip = require('gulp-zip');

gulp.task('clean', () => {
    return del(['./dist']);
});

gulp.task('node-mods', () => {
    return gulp.src('./package.json')
        .pipe(gulp.dest('dist/'))
        .pipe(install({production: true}));
});

gulp.task('zip', () => {
    return gulp.src('./dist/**', {nodir:true})
        .pipe(gulpzip('slackOpenAI.zip'))
        .pipe(gulp.dest('./dist'));
});


gulp.task('build', gulp.series('node-mods', 'zip'), () => {

})