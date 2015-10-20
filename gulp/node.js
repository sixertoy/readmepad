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
        del = require('del'),
        gulp = require('gulp'),
        path = require('path'),
        uglify = require('gulp-uglify'),
        jshint = require('gulp-jshint'),
        plumber = require('gulp-plumber'),
        runSequence = require('run-sequence'),
        sourcemaps = require('gulp-sourcemaps');

    gulp.task('node:server', function () {
        del.sync([
            path.join(dest, 'node', '**/*')
        ])
        return gulp.src(path.join(src, 'node', '**/*.js'))
            .pipe(plumber())
            //.pipe(jshint('.jshintrc'))
            //.pipe(jshint.reporter('jshint-stylish'))
            .pipe(sourcemaps.init())
            .pipe(uglify({
                compress: true
            }))
            .pipe(sourcemaps.write())
            .pipe(plumber.stop())
            .pipe(gulp.dest(path.join(dest, 'node')));
    });

    gulp.task('node:app', function () {
        del.sync([
            path.join(dest, 'node.js')
        ])
        return gulp.src(path.join(src, 'node.js'))
            .pipe(plumber())
            //.pipe(jshint('.jshintrc'))
            //.pipe(jshint.reporter('jshint-stylish'))
            .pipe(sourcemaps.init())
            .pipe(uglify({
                compress: true
            }))
            .pipe(sourcemaps.write())
            .pipe(plumber.stop())
            .pipe(gulp.dest(dest));
    });

    gulp.task('node', function (cb) {
        runSequence('node:server', 'node:app', cb);
    });



}());