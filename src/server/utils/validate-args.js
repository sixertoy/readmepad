/*jslint indent: 4, nomen: true, plusplus: true */
/*globals require, module */
(function () {

    'use strict';

    var _ = require('lodash'),

        wrapper = {

            /**
             *
             * Check if is string
             * Trim the string
             * Check if string is empty
             *
             */
            isString: function (v) {
                if (_.isString(v)) {
                    return !_.chain(v).trim().isEmpty().value();
                }
                return false;
            }

        },

        /**
         * 
         * 
         * 
         */
        validate = {
            exec: function (args, validator) {
                if (arguments.length < 2 || !_.isArguments(args) || !_.isArray(validator)) {
                    throw new Error('unable to validate args');
                }
                if (validator.length < 1) {
                    return true;
                }
                if (args.length < validator.length) {
                    return false;
                }
                var r;
                args = _.toArray(args).slice(0, validator.length);
                return (_.chain(args).map(function (n, i) {
                    r = false;
                    // return function name
                    switch (validator[i].toString().match(/function ([^\(]+)/)[1]) {
                    case 'isString':
                        r = wrapper.isString(n);
                        break;
                    default:
                        r = validator[i](n);
                        break;
                    }
                    return r;
                }).compact().value().length === validator.length);
            }
        };

    module.exports = validate.exec;

}());