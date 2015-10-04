var gulp = require('gulp');
var webserver = require('gulp-webserver');
var sass = require('gulp-sass');

gulp.task('webserver', function() {
  gulp.src('app')
    .pipe(webserver({
      livereload: true,
      directoryListing: false,
      open: true,
      fallback: 'index.html'
    }));
});

gulp.task('sass', function () {
  gulp.src('./app/css/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./app/css'));
});

gulp.task('sass:watch', function () {
  gulp.watch('./app/css/**/*.scss',['sass']);
});



gulp.task('default', ['webserver','sass:watch']);
