const gulp = require('gulp');
const deletea = require('deletea');

gulp.task('assets', function() {
    return gulp.src([
      './public/**/*',
    ])
    .pipe(gulp.dest('./dist'));
});

gulp.task('clean', function() {
  // local folder named dist will get deleted
  deletea('dist');
});

gulp.task('default', ['clean', 'assets']);