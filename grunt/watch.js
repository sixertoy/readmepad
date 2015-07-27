/*jslint indent: 4 */
/*global module */
module.exports = {
    options: {
        cwd: '.',
        livereload: true,
        livereloadOnError: false
    },
    html: {
        files: ['./src/html/**/*', './src/html/**/*.hbs', './src/html/**/*.tpl'],
        tasks: ['build_html']
    },
    jasmine: {
        files: ['./src/**/*.js', './spec/**/*.js'],
        tasks: ['build_jasmine']
    },
    server: {
        files: ['./src/server/**/*.js'],
        tasks: ['build_server']
    }
};
