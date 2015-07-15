/*jslint indent: 4 */
/*global module */
module.exports = {
    options: {
        cwd: '.',
        livereload: true,
        livereloadOnError: false
    },
    server: {
        files: ['./src/server/**/*'],
        tasks: ['build_server']
    },
    html: {
        files: ['./src/html/**/*', './src/html/**/*.hbs', './src/html/**/*.tpl'],
        tasks: ['build_html']
    }
};
