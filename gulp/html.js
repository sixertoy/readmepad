/*jslint indent: 4 */
/*globals module, require */
(function(){

    'use strict';

    var source = '',
        gulp = require('gulp'),
        cleandest = require('gulp-clean-dest');;

    module.exports = function(gulp){

        gulp.task('html', function() {
            return gulp.src('')
                .pipe(cleandest())

        });

        /*
         * var watch = require('gulp-watch');
         * var react = require('gulp-react');
         * var
         */

    };

}());
