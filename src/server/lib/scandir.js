/*jslint indent: 4, nomen: true */
/*global require, module, exports, process */
(function () {

    'use strict';

    var dotbase = '.',
        // requires
        Q = require('q'),
        FS = require('fs'),
        Path = require('path'),
        Util = require('util'),
        lodash = require('lodash'),
        Utils = require('./utils'),
        //
        // Object Scandir
        Scandir = function () {

            /**
             *
             * defaults
             *
             */
            this.root = dotbase;
            this.defaults = {
                depth: 0,
                filters: []
            };

            /**
             *
             *
             *
             */
            this.options = function () {
                return lodash.assign({
                    root: this.root
                }, this.defaults);
            };

            /**
             *
             * Verifie qu'un dossier contient des fichiers
             *
             */
            this.hasfiles = function (base) {
                var deferred = Q.defer();
                //
                FS.readdir(base, function (err, files) {
                    if (err) {
                        deferred.reject(new Error('Invalid path. Aborted'));
                    } else {
                        if (files.length) {
                            deferred.resolve(files);
                        } else {
                            deferred.resolve(false);
                        }
                    }
                });
                return deferred.promise;
            };

            /**
             *
             *
             *
             */
            this.build = function (base, stats) {
                var deferred = Q.defer(),
                    data = {
                        files: [],
                        stats: stats,
                        fullpath: base,
                        name: Utils.dirname(base)
                    };
                //
                this.hasfiles(base).then(function (files) {
                    if (files) {
                        data.files = files;
                    }
                    deferred.resolve(data);

                }, function (err) {
                    deferred.reject(err);

                });
                return deferred.promise;
            };

            /**
             *
             * Scandir Entry Point
             *
             */
            this.exec = function (pBase, pOptions) {
                var obj, msg, name,
                    result = {},
                    $this = this,
                    deferred = Q.defer();
                //
                // si l'argument base n'est pas une string
                // ou n'est pas un objet
                if (!lodash.isString(pBase) && !lodash.isPlainObject(pBase)) {
                    msg = 'Invalid arguments. Aborted.';
                    deferred.reject(new Error(msg));
                }
                //
                // si l'argument base
                // est un objet
                if (lodash.isPlainObject(pBase)) {
                    // on transforme options en objet
                    // sur une de valeurs par defaut
                    pOptions = lodash.assign({}, pBase);
                    pBase = this.root;
                }
                //
                // defaults parameters
                if (lodash.isEmpty(pBase)) {
                    pBase = this.root;
                }
                if (!lodash.isPlainObject(pOptions)) {
                    pOptions = {};
                }
                // si base n'est pas un chemin absolut
                if (!Path.isAbsolute(pBase)) {
                    pBase = Path.join(process.cwd(), pBase);

                }

                this.root = Path.normalize(pBase);
                this.defaults = lodash.assign(this.defaults, pOptions);

                FS.stat(this.root, function (err, stats) {
                    if (err) {
                        deferred.reject(err);
                    } else if (lodash.isEmpty(stats) || !stats.isDirectory()) {
                        msg = 'Invalid path. Aborted.';
                        deferred.reject(new Error(msg));
                    } else {
                        // lance l'exploration du dossier
                        $this.build($this.root, stats).then(function (data) {
                            deferred.resolve(data);
                        }, function (err) {
                            deferred.reject(err);
                        });
                    }
                });
                return deferred.promise;
            };

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

    module.exports = Scandir;

}());
