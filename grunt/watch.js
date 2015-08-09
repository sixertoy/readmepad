/*jslint indent: 4 */
/*global module */
module.exports = {
    options: {
        cwd: '.',
        livereload: 1337,
        livereloadOnError: false
    },
    html: {
        files: ['./src/public/**/*', './src/public/**/*.hbs', './src/public/**/*.tpl'],
        tasks: ['build_html']
    },
    server: {
        files: ['./src/server/**/*.js'],
        tasks: ['build_server']
    }
};
