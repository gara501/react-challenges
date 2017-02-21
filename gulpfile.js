const gulp = require('gulp');
const webpack = require('webpack-stream');

gulp.task('assets', function() {
    return gulp.src('./public/images/**/*')
    .pipe(gulp.dest('./dist/images'));
});

gulp.task('default', ['assets']);