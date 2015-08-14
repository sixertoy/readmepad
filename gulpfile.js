/*jslint indent: 4 */
/*globals module, require */
(function () {

    'use strict';

    var // variables
        dest,
        src = 'src',
        dist = 'build',
        bower_src = 'bower_components',
        // requires
        gulp = require('gulp'),
        path = require('path'),
        preen = require('preen'),
        less = require('gulp-less'),
        delta = require('gulp-delta'),
        rename = require('gulp-rename'),
        uglify = require('gulp-uglify'),
        flatten = require('gulp-flatten'),
        minifycss = require('gulp-minify-css'),
        autoprefixer = require('gulp-autoprefixer');

    gulp.task('preen', function (cb) {
        preen.preen({}, cb);
    });

    dest = path.join(bower_src, '**/*.js');
    gulp.task('bower:js', function () {
        gulp.src(dest)
            .pipe(delta(dest))
            .pipe(uglify()) // Minify CSS
            .pipe(rename({
                suffix: '.min'
            }))
            .pipe(flatten())
            .pipe(gulp.dest(path.join(dist, 'html', 'js', 'lib')));
    });

    dest = path.join(bower_src, '**/*.css');
    gulp.task('bower:css', function () {
        gulp.src(dest)
            .pipe(delta(dest))
            .pipe(minifycss()) // Minify CSS
            .pipe(rename({
                suffix: '.min'
            }))
            .pipe(flatten())
            .pipe(gulp.dest(path.join(dist, 'html', 'css', 'lib')));
    });

    gulp.task('bower', ['preen', 'bower:css', 'bower:js']);

}());
