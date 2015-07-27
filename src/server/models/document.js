/*jslint indent: 4, nomen: true, plusplus: true */
/*globals require, module */
(function () {

    'use strict';

    var model,
        ENCODING = {
            encoding: 'utf8'
        },
        FS = require('fs');

    model = {

        /**
         *
         * Ouvre un fichier
         *
         */
        openFile: function (filepath, callback) {
            FS.readFile(filepath, ENCODING, callback);
        },

        /**
         *
         * Ouvre un fichier
         *
         */
        updateFile: function () {
            // FS.readFile(filepath, ENCODING, callback);
        }

    };

    module.exports = model;

}());
