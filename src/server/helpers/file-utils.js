/*jslint indent: 4, nomen: true, plusplus: true */
/*globals require, module */
(function () {

    'use strict';

    var lodash = require('lodash');

    module.exports = {

        tofilename: function (name) {
            if (arguments.length < 1 || !lodash.isString(name) || lodash.isEmpty(name.trim())) {
                throw new Error('invalid argument');
            } else {
                return lodash.chain(name.trim())
                    .deburr().snakeCase().value();
            }
        }

    };

}());
