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
        less = require('gulp-less'),
        autoprefixer = require('gulp-autoprefixer'),
        gulp = require('gulp'),
        path = require('path'),
        mustacher = require('gulp-mustacher');

    gulp.task('favico_compile', function () {
        gulp.src(path.join(src, ''))
    });
    gulp.task('less_compile', function () {
        gulp.src(path.join(src, 'html', 'less', '**/*.less'))
            .pipe(less())
            .pipe(autoprefixer())
            .pipe(gulp.dest(path.join(dest, 'html', 'css')));
    });

    gulp.task('html_compile', function () {
        gulp.src(path.join(src, 'html', '*.tpl'))
            .pipe(mustacher({
                partials: {
                    src: './src/html/partials/'
                }
            }))
            .pipe(gulp.dest(path.join(dest, 'html')));
    });

    gulp.task('build_html', ['html_compile', 'less_compile']);

}());
