/*jslint indent: 4 */
/*global module */
module.exports = {
    all: {
        expand: true,
        cwd: 'src/html/',
        dest: './public/html/',
        src: ['**/*', '!**/*.less', '!less']
    }
};
