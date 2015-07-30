/*jslint indent: 4 */
/*global module */
module.exports = {
    options: {
        jshintrc: '.jshintrc'
    },
    html: ['./src/html/js/**/*.js', '!./src/html/js/lib/**/*.js'],
    project: ['index.js', 'Gruntfile.js', './spec/**/*.js'],
    server: ['./src/server/**/*.js'],
    jasmine: ['./spec/**/*.js']
};
