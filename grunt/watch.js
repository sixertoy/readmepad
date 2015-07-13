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
        files: ['./src/html/**/*'],
        tasks: ['build_html']
    }
};
