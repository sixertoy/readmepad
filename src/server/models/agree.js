/*jslint indent: 4, nomen: true */
/*globals require, module */
(function () {

    'use strict';

    var agree,
        Q = require('q'),
        fs = require('fs'),
        _ = require('lodash'),
        path = require('path'),
        fse = require('fs-extra'),
        isurl = require('is-url'),
        archiver = require('archiver'),
        isgiturl = require('is-git-url'),
        filenamify = require('filenamify'),
        isabsolute = require('is-absolute');

    agree = {

        /**
         *
         * Clone un repository git
         *
         */
        _execPathCopy: function (input, output) {
            var q = Q.defer(),
                args = _.chain(arguments).toArray().compact().value();
            if (args.length < 2 || !_.filter(args, _.isString) || _.filter(args, _.isEmpty).length) {
                throw new Error('missing arguments');
            }
            fse.copy(input, output, function (err) {
                if (err) {
                    q.reject(new Error('error during copying files'));
                } else {
                    q.resolve(true);
                }
            });
            return q.promise;
        },

        /**
         *
         * Clone un repository git
         *
         */
        _execClone: function () {
            var q = Q.defer();
            q.resolve(true);
            return q.promise;

        },

        /**
         *
         * Clone un repository git
         *
         */
        _execPathArchive: function () {
            var q = Q.defer();
            q.resolve(true);
            return q.promise;
        },

        /**
         *
         * Clone un repository git
         *
         */
        _execURLArchive: function () {
            var q = Q.defer();
            q.resolve(true);
            return q.promise;
        },

        /**
         *
         * main entry function
         *
         */
        exec: function (name, input, output) {
            var file, slug,
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
                slug = filenamify(name);
                // check input path
                if (isgiturl(input)) {
                    // si est un repo git
                    agree._execClone().then(function () {
                        q.resolve(true);
                    }, function () {
                        q.reject(false);
                    });

                } else if (isurl(input)) {
                    // si est une url
                    if (path.extname(input) === '.zip') {
                        // si le chemin pointe vers un fichier zip
                        agree._execURLArchive().then(function () {
                            q.resolve(true);
                        }, function () {
                            q.reject(false);
                        });

                    } else if (path.extname(input) === '.git') {
                        // si le chemin pointe vers un repo.git
                        agree._execClone().then(function () {
                            q.resolve(true);
                        }, function () {
                            q.reject(false);
                        });

                    } else {
                        q.reject(new Error('invalid url must target a zip file or a git repository'));
                    }

                } else if (!isabsolute(input) || !isabsolute.win32(input)) {
                    // si le chemon n'est pas un chemin absolu
                    q.reject(new Error('input must be an absolute path'));
                } else {
                    // sinon on verifie la validite du chemin
                    input = path.normalize(input);
                    fs.lstat(input, function (err, fstat) {
                        if (err) {
                            q.reject(new Error('input path does not exists'));
                        } else {
                            // si c'es un fichier zip
                            if (fstat.isFile() && path.extname(input) === '.zip') {
                                agree._execPathArchive().then(function () {
                                    q.resolve(true);
                                }, function () {
                                    q.reject(false);
                                });

                            } else if (fstat.isDirectory()) {
                                // si c'est un repertoire
                                // copie la totalite du repertoire
                                // vers output
                                agree._execPathCopy(input, output).then(function () {
                                    q.resolve(true);
                                }, function (err) {
                                    q.reject(err);
                                });

                            } else {
                                // symlink ?
                                q.reject(new Error('invalid input, only zip file or directory allowed'));
                            }
                        }
                    });

                }

            }
            return q.promise;
        }
    };

    module.exports = agree;

}());
