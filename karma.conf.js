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
            'src/html/js/lib/angular-mocks.js',
            'src/html/js/lib/angular-sanitize.min.js',
            'src/html/js/lib/ui-bootstrap-tpls.min.js',
            'src/html/js/lib/lodash.min.js',
            'src/html/js/lib/markdown-it.min.js',
            'src/html/js/lib/angular-md5.min.js',
            'src/html/js/lib/ace.js',
            'src/html/js/lib/ng-scrollbar.min.js',
            'src/html/js/lib/ui-ace.min.js',
            'src/html/js/lib/ui-bootstrap.tpls.js',
            //
            'src/html/js/app.js',
            // Viewer
            'src/html/js/app/viewer/index.js',
            'src/html/js/app/viewer/controllers/viewer-controller.js',
            // Toolbar
            'src/html/js/app/toolbar/index.js',
            'src/html/js/app/toolbar/controllers/toolbar-controller.js',
            //
            // Sidebar
            'src/html/js/app/sidebar/index.js',
            'src/html/js/app/sidebar/services/projects-service.js',
            'src/html/js/app/sidebar/controllers/sidebar-controller.js',
            //
            /* *** specs *** */
            'spec/src/html/js/app/sidebar/services/projects-service.spec.js',
            'spec/src/html/js/app/viewer/controllers/viewer-controller.spec.js',
            'spec/src/html/js/app/sidebar/controllers/sidebar-controller.spec.js'
        ]
    });
};
