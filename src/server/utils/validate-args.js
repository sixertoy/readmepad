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
            exec: function (args, validators) {
                var r;
                // si aucun params
                if (_.isUndefined(args)) {
                    return true;
                } else {
                    if (_.isUndefined(validators)) {
                        return true;
                    } else if (!_.isArguments(args) || !_.isArray(validators)) {
                        throw new Error('missing arguments');
                    } else if (!validators.length) {
                        return true;
                    } else {
                        args = _.toArray(args);
                        if (_.isEmpty(args) && validators.length > 0) {
                            return false;
                        } else {
                            args = args.slice(0, validators.length);
                            return (_.chain(args).map(function (n, i) {
                                r = false;
                                // return function name
                                switch (validators[i].toString().match(/function ([^\(]+)/)[1]) {
                                case 'isString':
                                    r = wrapper.isString(n);
                                    break;
                                default:
                                    r = validators[i](n);
                                    break;
                                }
                                return r;
                            }).compact().value().length === validators.length);
                        }
                    }
                }
            }
        };

    module.exports = validate;

}());
