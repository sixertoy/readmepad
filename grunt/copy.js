/*jslint indent: 4 */
/*global module */
module.exports = {
    html: {
        expand: true,
        cwd: 'src/html/',
        dest: './build/public/html/',
        src: ['**/*', '!less', '!less/**/*', '!partials', '!partials/**/*', '!**/*.tpl', '!fonts', '!fonts/**/*']
    },
    server: {
        expand: true,
        cwd: './src/server/',
        dest: './build/server/',
        src: ['**/*']
    },
    bower_js: {
        expand: true,
        flatten: true,
        cwd: './bower_components/',
        dest: './src/html/js/lib/',
        src: ['angular/angular.min.js']
    },
    bower_js_globals: {
        expand: true,
        flatten: true,
        cwd: './bower_components/',
        dest: './src/html/js/lib/globals/',
        src: ['ace-builds/src-min-noconflict/ace.js', 'ace-builds/src-min-noconflict/mode-markdown.js', 'markdown-it/dist/markdown-it.min.js', 'lodash/lodash.min.js']
    },
    bower_js_angular: {
        expand: true,
        flatten: true,
        cwd: './bower_components/',
        dest: './src/html/js/lib/angular/',
        src: ['angular-sanitize/angular-sanitize.min.js', 'angular-ui-ace/ui-ace.min.js', 'angular-bootstrap/ui-bootstrap-tpls.min.js', 'angular-md5/angular-md5.min.js', 'angular-mocks/angular-mocks.js', 'ng-scrollbar/dist/ng-scrollbar.min.js', 'angular-ui-router/release/angular-ui-router.min.js', 'angular-base64/angular-base64.min.js', 'angular-loading-bar/build/loading-bar.min.js', 'angular-animate/angular-animate.min.js']
    },
    bower_css: {
        expand: true,
        flatten: true,
        dest: './src/html/css/',
        cwd: './bower_components/',
        src: ['bootstrap/dist/css/bootstrap.min.css', 'normalize.css/normalize.css', 'octicons/octicons/octicons.css', 'octicons/octicons/octicons.ttf', 'octicons/octicons/octicons.woff', 'octicons/octicons/octicons.eot', 'octicons/octicons/octicons.svg', 'ng-scrollbar/dist/ng-scrollbar.min.css', 'angular-loading-bar/build/loading-bar.min.css']
    }
};
