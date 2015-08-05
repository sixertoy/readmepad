/*jslint indent: 4 */
/*globals module, require */
module.exports = function (config) {
    'use strict';
    config.set({
        basePath: './',
        autoWatch: false,
        frameworks: ['jasmine'],
        browsers: ['PhantomJS'],
        plugins: [
            'karma-jasmine',
            'karma-chrome-launcher',
            'karma-phantomjs-launcher'
        ],
        files: [
            'src/html/js/lib/angular.min.js',
            'src/html/js/lib/angular/**/*.js',
            'src/html/js/lib/globals/**/*.js',
            //
            'src/html/js/app.js',
            // Viewer
            'src/html/js/app/viewer/index.js',
            'src/html/js/app/viewer/viewer-controller.js',
            // Cheatsheet
            'src/html/js/app/cheatsheet/index.js',
            'src/html/js/app/cheatsheet/cheatsheet-controller.js',
            // Toolbar
            'src/html/js/app/toolbar/index.js',
            'src/html/js/app/toolbar/toolbar-controller.js',
            //
            // Sidebar
            'src/html/js/app/sidebar/index.js',
            'src/html/js/app/sidebar/sidebar-service.js',
            'src/html/js/app/sidebar/sidebar-controller.js',
            //
            /* *** specs *** */
            'spec/src/html/js/app/sidebar/sidebar-service.spec.js',
            'spec/src/html/js/app/viewer/viewer-controller.spec.js',
            'spec/src/html/js/app/sidebar/sidebar-controller.spec.js'
        ]
    });
};
