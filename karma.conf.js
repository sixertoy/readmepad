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
            'src/html/js/lib/angular.min.js',
            'src/html/js/lib/angular-mocks.js',
            //'src/html/js/app.js',
            'src/html/js/app/viewer/controllers/viewer-controller.js',
            'spec/src/html/js/app/viewer/controllers/viewer-controller.spec.js'
            //
        ],
        junitReporter: {
            outputFile: 'test_out/unit.xml',
            suite: 'unit'
        }
    });
};
