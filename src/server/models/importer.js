/*jslint indent: 4, nomen: true */
/*globals require, module */
(function () {

    'use strict';

    var Q = require('q'),
        fs = require('fs'),
        _ = require('lodash'),
        path = require('path'),
        isurl = require('is-url'),
        archiver = require('archiver'),
        isgiturl = require('is-git-url'),
        isabsolute = require('is-absolute'),
        futils = require('./../helpers/file-utils');

    module.exports = {

        exec: function (name, input, output) {
            var file,
                q = Q.defer(),
                args = _.chain(arguments).toArray().compact().value();
            // test des
            if (args.length < 3 || _.filter(args, _.isString).length < 3 || _.chain(args).map(_.trim).some(_.isEmpty, true).value()) {
                q.reject(new Error('needs 3 arguments'));
            } else {
                args = _.map(args, _.trim);
                // test de la validite des arguments
                name = args[0];
                input = args[1];
                output = args[2];
                // check input path
                if (isgiturl(input)) {
                    // si est un repo git
                    q.resolve(true);

                } else if (isurl(input)) {
                    // si est une url
                    q.resolve(true);

                } else if (!isabsolute(input)) {
                    // si le chemon n'est pas un chemin absolu
                    q.reject(new Error('input path must be absolute'));
                } else {
                    // sinon on verifie la validite du chemin
                    fs.stat(input, function (err, stats) {
                        if (err) {
                            q.reject(new Error('invalid input path'));
                        } else {
                            q.resolve(true);
                        }
                    });

                }

                //  || lodash.isEmpty(name) || !isuri.test(input.trim()) || !isuri.test(output.trim())

                /*
                file = futils.tofilename(name);
                if (!path.isAbsolute(input)) {
                    q.reject(new Error('input must be an absolute path'));
                } else {
                    // check if input path exists
                    q.resolve(true);
                }
                */

            }
            return q.promise;
        }
    };
}());
