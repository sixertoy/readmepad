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
        dest = './dist',
        // requires
        del = require('del'),
        gulp = require('gulp'),
        path = require('path'),
        uglify = require('gulp-uglify'),
        jshint = require('gulp-jshint'),
        plumber = require('gulp-plumber'),
        runSequence = require('run-sequence'),
        sourcemaps = require('gulp-sourcemaps');

    gulp.task('server:app', function () {

        del.sync([
            path.join(dest, 'server', '**/*')
        ])
        return gulp.src(path.join(src, 'server', '**/*.js'))
            .pipe(plumber())
            //.pipe(jshint('.jshintrc'))
            //.pipe(jshint.reporter('jshint-stylish'))
            /*
            .pipe(sourcemaps.init())
            .pipe(uglify({
                compress: true
            }))
            .pipe(sourcemaps.write())
            */
            .pipe(plumber.stop())
            .pipe(gulp.dest(path.join(dest, 'server')));
    });

    gulp.task('server:main', function () {
        del.sync([
            path.join(dest, '.env'),
            path.join(dest, 'server.js')
        ])
        //
        // env vars
        gulp.src(path.join(src, '..', '.env'))
            .pipe(gulp.dest(dest));
        //
        // main server
        return gulp.src(path.join(src, 'server.js'))
            .pipe(plumber())
            //.pipe(jshint('.jshintrc'))
            //.pipe(jshint.reporter('jshint-stylish'))
            /*
            .pipe(sourcemaps.init())
            .pipe(uglify({
                compress: true
            }))
            .pipe(sourcemaps.write())
            */
            .pipe(plumber.stop())
            .pipe(gulp.dest(dest));
    });

    gulp.task('server', function (cb) {
        runSequence('server:main', 'server:app', cb);
    });



}());