/*jslint indent: 4 */
/*global module */
module.exports = {
    html: {
        expand: true,
        cwd: 'src/html/',
        dest: './build/public/html/',
        src: ['**/*', '!less', '!less/**/*', '!partials', '!partials/**/*', '!**/*.tpl']
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
        src: ['ace-builds/src-min-noconflict/ace.js', 'ace-builds/src-min-noconflict//mode-markdown.js', 'angular-sanitize/angular-sanitize.min.js', 'angular/angular.min.js', 'markdown-it/dist/markdown-it.min.js', 'angular-ui-ace/ui-ace.min.js', 'angular-bootstrap/ui-bootstrap-tpls.js', 'lodash/lodash.min.js', 'angular-md5/angular-md5.min.js', 'angular-mocks/angular-mocks.js']
    },
    bower_css: {
        expand: true,
        flatten: true,
        dest: './src/html/css/',
        cwd: './bower_components/',
        src: ['bootstrap/dist/css/bootstrap.min.css', 'normalize.css/normalize.css']
    }
};
