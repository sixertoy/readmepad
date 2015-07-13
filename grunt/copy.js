/*jslint indent: 4 */
/*global module */
module.exports = {
    html: {
        expand: true,
        cwd: 'src/html/',
        dest: './build/public/html/',
        src: ['**/*', '!**/*.less', '!less']
    },
    server: {
        expand: true,
        cwd: 'src/server/',
        dest: './build/server/',
        src: ['**/*']
    }
};
