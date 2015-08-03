/*jslint indent: 4 */
/*global module */
module.exports = {
    options: {
        remove: true,
        cascade: true,
        browsers: ['last 2 versions', 'ie 8', 'ie 9']
    },
    dev: {
        expand: true,
        flatten: true,
        dest: './build/html/css',
        src: ['./build/html/css/*.css', './build/html/css/*.min.css']
    }
};
