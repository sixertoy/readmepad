/**
 *
 * Install Locals Dev
 * npm install gulp gulp-jshint jshint-stylish --save-dev
 *
 */
/*jslint indent: 4, nomen: true, plusplus: true */
/*globals require, module */
(function () {

    'use strict';

    var // variables
        src = './src',
        dest = './build',
        // requires
        gulp = require('gulp'),
        path = require('path'),
        jshint = require('gulp-jshint');

    gulp.task('copy_server', function () {
        gulp.src(path.join(src, 'server', '**/*.js'))
            // .pipe(jshint('.jshintrc'))
            // .pipe(jshint.reporter('jshint-stylish'))
            .pipe(gulp.dest(path.join(dest, 'server')));
    });

    gulp.task('copy_app', function () {
        gulp.src(path.join(src, 'app.js'))
            // .pipe(jshint('.jshintrc'))
            // .pipe(jshint.reporter('jshint-stylish'))
            .pipe(gulp.dest(dest));
    });


    gulp.task('build_server', ['copy_app', 'copy_server']);



}());
