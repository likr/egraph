'use strict';
var gulp = require('gulp'),
    babel = require('gulp-babel'),
    plumber = require('gulp-plumber'),
    shell = require('gulp-shell'),
    source = require('vinyl-source-stream'),
    browserify = require('browserify'),
    babelify = require('babelify');

gulp.task('babel', function() {
  return gulp.src('src/**/*.js')
      .pipe(plumber())
      .pipe(babel({optional: ['runtime']}))
      .pipe(gulp.dest('lib'));
});

gulp.task('browserify', function() {
  return browserify({entries: ['./lib/index.js']})
    .bundle()
    .pipe(source('eg-graph.js'))
    .pipe(gulp.dest('.'));
});

gulp.task('example', ['babel'], function() {
  return browserify({entries: ['./example/index.js']})
    .transform(babelify)
    .bundle()
    .pipe(source('app.js'))
    .pipe(gulp.dest('example'));
});

gulp.task('mocha', ['babel'], shell.task(['mocha --recursive --colors --reporter dot --compilers js:babel/register']));

gulp.task('build', ['babel']);

gulp.task('test', ['babel', 'mocha']);

gulp.task('watch', function() {
  gulp.watch('src/**/*.js', ['babel', 'mocha', 'example']);
  gulp.watch(['test/**/*.js'], ['mocha']);
  gulp.watch(['example/index.js', 'example/**/*.html'], ['example']);
});

gulp.task('default', ['build']);
