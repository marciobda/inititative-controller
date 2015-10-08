var gulp = require('gulp');
var webserver = require('gulp-webserver');
var sass = require('gulp-sass');
var htmlreplace = require('gulp-html-replace');
var concat = require('gulp-concat');
var copy = require('gulp-copy');
var sequence = require('gulp-sequence');

gulp.task('webserver', function() {
  gulp.src('.')
    .pipe(webserver({
      livereload: true,
      directoryListing: false,
      open: 'app',
      host: '0.0.0.0'
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

gulp.task('html-replace', function () {
    gulp.src('./app/index.html')
        .pipe(htmlreplace({
            'css':'css/style.css',
            'js':'js/bundle.js'
        }))
        .pipe(gulp.dest('dist/'));
});

gulp.task('copy', function () {
    gulp.src('./app/**/*.html')
        .pipe(copy('dist', {prefix: 1}));
    gulp.src('./app/css/style.css')
        .pipe(copy('dist', {prefix: 1}));
});

gulp.task('scripts', function () {
    gulp.src([
        'bower_components/angular/angular.js',
        'bower_components/drag-drop-webkit-mobile/ios-drag-drop.js',
        'app/js/app.js'
    ])
    .pipe(concat('bundle.js'))
    .pipe(gulp.dest('./dist/js/'));
});

gulp.task('build', sequence(['copy','scripts'],'html-replace'));

gulp.task('default', ['webserver','sass:watch']);
