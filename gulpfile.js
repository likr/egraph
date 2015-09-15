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
    .pipe(source('egraph.js'))
    .pipe(gulp.dest('.'));
});

gulp.task('mocha', shell.task(['mocha --recursive --colors --reporter dot --require misc/babel_hook.js']));

gulp.task('build', ['babel']);

gulp.task('test', ['mocha']);

gulp.task('release', ['babel'], shell.task(['npm publish']));

gulp.task('watch', function() {
  gulp.watch('src/**/*.js', ['mocha']);
  gulp.watch(['test/**/*.js'], ['mocha']);
});

gulp.task('default', ['build']);
