/*jslint indent: 4 */
/*globals module, require */
(function () {

    'use strict';

    var gulp = require('gulp'),
        runSequence = require('run-sequence');
    //
    // tasks
    require('./gulp/build');
    require('./gulp/bower');
    //
    // default
    gulp.task('default', function(cb){
        runSequence('bower', 'build', cb);
    });

}());
