/*jslint indent: 4 */
/*global module */
module.exports = {
    options: {
        cwd: '.',
        livereload: true,
        livereloadOnError: false
    },
    documentation: {
        files: ['./src/docs/**/*.md', './src/docs/meta.json'],
        tasks: ['build_documentation']
    },
    jasmine: {
        files: ['./spec/src/**/*.spec.js', 'src/**/*.js'],
        tasks: ['jasmine_node']
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
