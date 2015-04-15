'use strict';
var gulp = require('gulp'),
    babel = require('gulp-babel'),
    shell = require('gulp-shell'),
    source = require('vinyl-source-stream'),
    browserify = require('browserify');

gulp.task('babel', function() {
  return gulp.src('src/**/*.js')
      .pipe(babel())
      .pipe(gulp.dest('lib'));
});

gulp.task('browserify', function() {
  browserify({entries: ['./lib/index.js']})
    .bundle()
    .pipe(source('egraph.js'))
    .pipe(gulp.dest('.'));
});

gulp.task('mocha', shell.task(['mocha --recursive --colors --reporter dot --compilers js:babel/register']));

gulp.task('build', ['babel']);

gulp.task('test', ['babel', 'mocha']);

gulp.task('watch', function() {
  gulp.watch('src/**/*.js', ['babel', 'mocha']);
  gulp.watch('test/**/*.js', ['mocha']);
});

gulp.task('default', ['build']);
