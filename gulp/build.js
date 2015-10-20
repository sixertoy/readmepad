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
        src = './src/html',
        dest = './dist/public',
        // requires
        del = require('del'),
        gulp = require('gulp'),
        path = require('path'),
        sass = require('gulp-sass'),
        rename = require('gulp-rename'),
        concat = require('gulp-concat'),
        plumber = require('gulp-plumber'),
        runSequence = require('run-sequence'),
        mustacher = require('gulp-mustacher'),
        minifycss = require('gulp-minify-css'),
        sourcemaps = require('gulp-sourcemaps'),
        autoprefixer = require('gulp-autoprefixer');

    gulp.task('build:html', function () {
        del.sync([
            path.join(dest, '**/*.html'),
            path.join(dest, 'favicon.ico')
        ]);
        //
        // favicon
        gulp.src(path.join(src, 'favicon.ico'))
            .pipe(gulp.dest(path.join(dest)));
        //
        // html
        return gulp.src(path.join(src, '*.tpl'))
            .pipe(mustacher({
                partials: {
                    src: path.join(src, 'partials')
                }
            }))
            .pipe(gulp.dest(path.join(dest)));
    });

    gulp.task('build:sass', function () {
        del.sync([
            path.join(dest, 'css', '**/*.min.css'),
            '!' + path.join(dest, 'css', 'vendor.min.css')
        ])
        return gulp.src(path.join(src, 'sass', '/*.scss'))
            .pipe(plumber())
            .pipe(sourcemaps.init())
            .pipe(sass())
            .pipe(autoprefixer({
                browsers: ['last 2 versions'],
                cascade: false
            }))
            .pipe(minifycss({compatibility: 'ie8'}))
            .pipe(rename({
                suffix: '.min'
            }))
            .pipe(sourcemaps.write())
            .pipe(plumber.stop())
            .pipe(gulp.dest(path.join(dest, 'css')));
    });

    gulp.task('build:css', function () {

    });

    gulp.task('build:js', function () {

    });

    gulp.task('build', function (cb) {
        runSequence('build:css', 'build:sass', 'build:js', 'build:html', cb);
    });

}());