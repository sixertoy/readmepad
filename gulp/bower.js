/*jslint indent: 4, nomen: true, plusplus: true */
/*globals require, module */
(function () {

    'use strict';

    var // variables
        src = 'src',
        dest = 'build',
        bower_src = 'bower_components',
        //
        preen = require('./gulp-preen'),
        //
        del = require('del'),
        path = require('path'),
        gulp = require('gulp'),
        //rename = require('gulp-rename'),
        concat = require('gulp-concat'),
        flatten = require('gulp-flatten'),
        plumber = require('gulp-plumber'),
        //delta = require('gulp-delta'),
        //uglify = require('gulp-uglify'),
        //sourcemaps = require('sourcemaps'),
        runSequence = require('run-sequence'),
        minifycss = require('gulp-minify-css'),
        sourcemaps = require('gulp-sourcemaps');
    // autoprefixer = require('gulp-autoprefixer');

    /**
     * 
     * recupere tous les fichiers JS
     * dans le dossier bower_components
     * concatene les sources
     * et ecrit un fichier
     * vendor.js dans le dossier
     * build/html/js/
     * 
     */
    gulp.task('bower:js', function () {
        del.sync([
            path.join(dest, 'html', 'js', 'vendor.js')
        ]);
        return gulp.src(path.join(bower_src, '**/*.js'))
            .pipe(plumber())
            //.pipe(sourcemaps.init())
            .pipe(concat('vendor.js', {
                newLine: ';'
            }))
            //.pipe(sourcemaps.write())
            .pipe(plumber.stop())
            .pipe(gulp.dest(path.join(dest, 'html', 'js')));
    });

    /**
     * 
     * recupere tous les fichiers CSS
     * dans le dossier bower_components
     * concatene les sources
     * et ecrit un fichier
     * vendor.css dans le dossier
     * build/html/css/
     * 
     */
    gulp.task('bower:css', function () {
        del.sync([
            path.join(dest, 'html', 'css', 'vendor.css')
        ]);
        return gulp.src(path.join(bower_src, '**/*.css'))
            .pipe(plumber())
            //.pipe(sourcemaps.init())
            .pipe(minifycss())
            .pipe(concat('vendor.min.css', {
                newLine: ''
            }))
            //.pipe(sourcemaps.write())
            .pipe(plumber.stop())
            .pipe(gulp.dest(path.join(dest, 'html', 'css')));
    });

    /**
     * 
     * recupere tous les fichiers EOT TTF WOFF SVG WOFF2
     * dans le dossier bower_components
     * concatene les sources
     * et ecrit un fichier
     * vendor.css dans le dossier
     * build/html/fonts/
     * 
     */
    gulp.task('bower:fonts', function () {
        del.sync([
            path.join(dest, 'html', 'fonts', 'vendor', '**/*')
        ]);
        return gulp.src([
                path.join(bower_src, '**/*.eot'),
                path.join(bower_src, '**/*.ttf'),
                path.join(bower_src, '**/*.svg'),
                path.join(bower_src, '**/*.woff'),
                path.join(bower_src, '**/*.woff2')
            ])
            .pipe(flatten())
            .pipe(gulp.dest(path.join(dest, 'html', 'fonts', 'vendor')));
    });

    gulp.task('bower', function (cb) {
        runSequence('preen', 'bower:css', 'bower:js', 'bower:fonts', cb);
    });

}());