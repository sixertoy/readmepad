/*jslint indent: 4 */
/*globals module, require */
module.exports = function (config) {
    'use strict';
    config.set({
        basePath: './',
        autoWatch: false,
        frameworks: ['jasmine'],
        plugins: [
            'karma-jasmine',
            'karma-chrome-launcher',
            'karma-phantomjs-launcher'
        ],
        browsers: ['PhantomJS'],
        files: [
            'src/html/js/**/*.js',
            'spec/src/html/js/**/*.spec.js'
        ],
        junitReporter: {
            outputFile: 'test_out/unit.xml',
            suite: 'unit'
        }
    });
};
