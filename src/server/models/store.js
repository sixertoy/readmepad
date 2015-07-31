/*jslint indent: 4, nomen: true, plusplus: true */
/*globals require, module, console */
(function () {

    'use strict';

    var db, store, dbfile,
        stores = {},
        Q = require('q'),
        md5 = require('md5'),
        nedb = require('nedb'),
        lodash = require('lodash');

    store = {

        /**
         *
         * Cree un projet en bdd
         *
         */
        createProject: function (name, project_name, project_path) {
            var document,
                q = Q.defer();
            if (arguments.length < 4) {
                q.reject(new Error('needs 4 arguments at least'));
                //
            } else {
                document = {
                    path: project_path,
                    name: project_name,
                    project_id: md5(project_path)
                };
                stores[name].insert(document, function (err, doc) {
                    if (err) {
                        q.reject(err);
                    } else {
                        if (doc) {
                            q.resolve(doc);
                        } else {
                            q.resolve(false);
                        }
                    }
                });
            }
            return q.promise;
        },

        /**
         *
         * Supprime un projet de la bdd
         *
         */
        deleteProject: function (name, project_path) {
            var q = Q.defer(),
                valid = arguments.length < 2 || !lodash.isString(project_path) || lodash.isEmpty(project_path.trim());
            if (valid) {
                q.reject(new Error('needs 2 argument at least'));
                //
            } else {
                stores[name].remove({
                    project_id: md5(project_path)
                }, function (err, count) {
                    if (err) {
                        q.reject(err);
                    } else {
                        q.resolve(count);
                    }
                });
            }
            return q.promise;
        },

        /**
         *
         * Supprime un projet de la bdd
         *
         */
        findOneProject: function (name, project_path) {
            var q = Q.defer();
            if (arguments.length < 2 || !lodash.isString(project_path) || lodash.isEmpty(project_path.trim())) {
                q.reject(new Error('needs 2 argument at least'));
                //
            } else {
                stores[name].findOne({
                    project_id: md5(project_path)
                }, function (err, doc) {
                    if (err) {
                        q.reject(err);
                    } else {
                        if (doc) {
                            q.resolve(doc);
                        } else {
                            q.resolve(false);
                        }
                    }
                });
            }
            return q.promise;
        },

        /**
         *
         * Supprime un projet de la bdd
         *
         */
        findAll: function (name) {
            var q = Q.defer(),
                valid = arguments.length < 1 || !lodash.isString(name) || lodash.isEmpty(name.trim());
            if (valid) {
                q.reject(new Error('needs 1 argument at least'));
                //
            } else {
                stores[name].find({}, function (err, docs) {
                    if (err) {
                        q.reject(err);
                    } else {
                        if (docs) {
                            q.resolve(docs);
                        } else {
                            q.resolve(false);
                        }
                    }
                });
            }
            return q.promise;
        },

        /**
         *
         * Chargement de la BDD
         * Crée les index si ils n'existent pas
         *
         */
        init: function (name, dbfile, callback) {
            try {
                stores[name] = new nedb({
                    autoload: false,
                    filename: dbfile
                });
                stores[name].loadDatabase(function (err) {
                    if (err) {
                        if (callback) {
                            callback('ReadmePad is unable to load database: %s');
                        }
                    } else {
                        console.log('DataBase %s loaded', name);
                        stores[name].ensureIndex({
                            unique: true,
                            fieldName: 'project_id'
                        }, function (err) {
                            var result = false;
                            if (err) {
                                result = 'ReadmePad is unable to create index on: %s database';
                            }
                            if (callback) {
                                callback(result);
                            }
                        });
                    }
                });
            } catch (e) {
                throw e;
            }
        }
    };

    module.exports = store;

}());
