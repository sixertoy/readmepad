/*jslint indent: 4 */
/*global module */
module.exports = function (grunt, options) {
    'use strict';
    return {
        options: {
            dest: './src/html'
        },
        all: {
            fonts: [
                'http://fonts.googleapis.com/css?family=Open+Sans:300italic,400italic,600italic,700italic,800italic,400,300,600,700,800'
            ]
        }
    };
};