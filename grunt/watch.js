/*jslint indent: 4 */
/*global module */
module.exports = {
    options: {
        cwd: '.',
        livereload: 1337,
        livereloadOnError: false
    },
    html: {
        files: ['./src/html/**/*', './src/html/**/*.hbs', './src/html/**/*.tpl'],
        tasks: ['build_html']
    },
    server: {
        files: ['./src/server/**/*.js'],
        tasks: ['build_server']
    }
};
