/*jslint indent: 4, nomen: true, plusplus: true */
/*globals require, module */
(function () {

    'use strict';

    var path = require('path'),
        lodash = require('lodash');

    module.exports = {

        name: function (fullpath) {
            var result, reg,
                base = path.normalize(fullpath),
                ps = (path.sep === '\\') ? '\\\\' : '/';
            reg = new RegExp(ps + '(?:.(?!' + ps + '))+$', 'gi');
            result = base.match(reg);
            return result[0].replace(path.sep, '');
        },

        /**
         *
         * Supprime les infos
         * non neccessaires pour la mise en BDD
         *
         */
        files: function (files, fullpath) {
            var result = {},
                $this = this,
                valid = arguments.length < 2 || !lodash.isArray(files) || !lodash.isString(fullpath) || lodash.isEmpty(fullpath.trim());
            if (valid) {
                throw new Error('need 2 arguments at least.');
            }
            if (!files.length) {
                return false;
            } else {
                files.forEach(function (item) {
                    result[item.fullpath] = item.name;
                });
                return result;
            }
        }
    };

}());
