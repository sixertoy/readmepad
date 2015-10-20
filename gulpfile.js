/*jslint indent: 4 */
/*globals module, require */
(function () {

    'use strict';
    
    require('./gulp/bower');

    var // variables
        dest,
        src = 'src',
        dist = 'build',
        bower_src = 'bower_components',
        // tasks
        // requires
        gulp = require('gulp'),
        runSequence = require('run-sequence');
        /*
        path = require('path'),
        less = require('gulp-less'),
        delta = require('gulp-delta'),
        rename = require('gulp-rename'),
        uglify = require('gulp-uglify'),
        flatten = require('gulp-flatten'),
        minifycss = require('gulp-minify-css'),
        autoprefixer = require('gulp-autoprefixer');
        */
    
    gulp.task('default', function(cb){
        runSequence('preen', 'bower', cb);
    });

}());
