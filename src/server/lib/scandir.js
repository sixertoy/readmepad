/*jslint indent: 4, nomen: true */
/*global require, module, exports, process */
(function () {

    'use strict';

    var Q = require('q'),
        FS = require('fs'),
        Path = require('path'),
        lodash = require('lodash'),
        defaults = {
            depth: 0,
            filters: []
        },
        scandir = {

            exec: function (base, options) {
                var msg, name, deferred,
                    obj = {};
                //
                // tests des arguments
                if (arguments.length < 1) {
                    base = Path.join(process.cwd(), '.');
                    options = lodash.assign({}, defaults);

                } else if (arguments.length < 2) {
                    if (!lodash.isString(base)) {
                        options = lodash.assign(base, defaults);
                        base = Path.join(process.cwd(), '.');

                    } else {
                        base = base.trim();
                        options = lodash.assign({}, defaults);
                    }
                }
                if (!lodash.isPlainObject(options) || !lodash.isString(base) || lodash.isEmpty(base)) {
                    msg = 'Invalid arguments. Aborted.';
                    throw new Error(msg);
                }
                //
                deferred = Q.defer();
                // normalisation du path
                base = Path.normalize(base);
                // check base as directoy
                FS.stat(base, function (err, stats) {
                    if (err || !stats.isDirectory()) {
                        if (err) {
                            deferred.reject(err);
                        } else {
                            msg = 'Path is not a directory. Cancelled.';
                            deferred.reject(new Error(msg));
                        }
                    } else {
                        scandir.hasfiles(base).then(function (files) {
                            if (files) {
                                name = Path.basename(base);
                                obj[name] = {
                                    files: files,
                                    fullpath: base
                                };
                                deferred.resolve(obj);
                            } else {
                                deferred.resolve(false);
                            }
                        }, function (err) {
                            deferred.reject(new Error(err));
                        });
                    }
                });
                return deferred.promise;
            },

            /**
             *
             * Verifie qu'un dossier contient des fichiers
             *
             */
            hasfiles: function (base) {
                var msg,
                    deferred = Q.defer(),
                    nvalid = (arguments.length < 0 || lodash.isEmpty(base) || !lodash.isString(base) || lodash.isEmpty(base.trim()));
                //
                if (nvalid) {
                    msg = 'Needs one argument. Aborted';
                    throw new Error(msg);
                } else {
                    //
                    base = Path.normalize(base);
                    FS.readdir(base, function (err, files) {
                        if (err) {
                            msg = 'Invalid path. Aborted';
                            deferred.reject(new Error(msg));
                        } else {
                            if (files.length) {
                                deferred.resolve(files);
                            } else {
                                deferred.resolve(false);
                            }
                        }
                    });
                }
                return deferred.promise;
            }

            /**
             *
             * Flatten data array
             * Return an object
             * First split of the data array is project name
             * Last split of the data array is file name
             *
             */
            /*
            asObject: function (data) {
                var proj, file, paths, obj,
                    result = {},
                    sep = Path.sep;
                data.sort().forEach(function (path) {
                    paths = path.split(sep);
                    file = paths.pop();
                    proj = paths[0];
                    if (!result.hasOwnProperty(proj)) {
                        result[proj] = [];
                    }
                    obj = {
                        link: path,
                        name: Path.basename(file, '.md')
                    };
                    result[proj].push(obj);
                });
                return result;
            },
            */

            /**
             *
             * Fill an array
             *
             * [ 'project_one\\index.md',
             * 'project_one\\pages\\dummy.md',
             * 'project_one\\pages\\dummy2.md',
             * ...]
             *
             */
            /*
            explore: function (base, parent, data) {
                var files, path, stats, current,
                    $this = this;
                FS.readdirSync(base).filter(function (file) {
                    if (file === '.' || file === '..') {
                        return false;
                    }
                    path = Path.join(base, file);
                    stats = FS.statSync(path);
                    //
                    // si c'est un fichier
                    if (stats.isFile()) {
                        return (Path.extname(path) === '.md');
                    } else if (stats.isDirectory()) {
                        //
                        // si c'est un dossier
                        files = $this._hasFiles(path);
                        if (files) {
                            current = Path.join(parent, file);
                            $this._explore(path, current, data);
                        }
                        return false;
                    }
                }).map(function (file) {
                    current = Path.join(parent, file);
                    data.push(current);
                    return true;
                });
            },
            */
            /*
            flatten: function (base) {
                var data = [];
                this._explore(base, '.', data);
                data = this._asObject(data);
                return data;
            }
            */

        };

    exports = module.exports = scandir.exec;
    exports.exec = scandir.exec;
    exports.hasfiles = scandir.hasfiles;

}());
