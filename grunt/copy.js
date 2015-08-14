/*jslint indent: 4 */
/*global module */
module.exports = {
    html: {
        expand: true,
        cwd: 'src/html/',
        dest: './build/public/',
        src: ['**/*', '!less', '!less/**/*', '!partials', '!partials/**/*', '!**/*.tpl', '!fonts', '!fonts/**/*']
    },
    server: {
        expand: true,
        cwd: './src/',
        dest: './build/',
        src: ['server/**/*.js', 'app.js']
    }
};
