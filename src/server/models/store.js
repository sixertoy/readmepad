/*jslint indent: 4, nomen: true, plusplus: true */
/*globals require, module, console */
(function () {

    'use strict';

    var db, store, dbfile,
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
        createProject: function (name, path, pages) {
            var document,
                q = Q.defer();
            if (arguments.length < 3) {
                q.reject(new Error('needs 3 arguments at least'));
                //
            } else {
                document = {
                    name: name,
                    path: path,
                    pages: pages,
                    project_id: md5(path)
                };
                db.insert(document, function (err, doc) {
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
        deleteProject: function (project_path) {
            var q = Q.defer();
            if (arguments.length < 1 || !lodash.isString(project_path) || lodash.isEmpty(project_path.trim())) {
                q.reject(new Error('needs 1 argument at least'));
                //
            } else {

                /*db.remove({
                    project_id: md5(project_path)
                });*/
            }
            return q.promise;
        },

        /**
         *
         * Supprime un projet de la bdd
         *
         */
        findOneProject: function (project_path) {
            var q = Q.defer();
            if (arguments.length < 1 || !lodash.isString(project_path) || lodash.isEmpty(project_path.trim())) {
                q.reject(new Error('needs 1 argument at least'));
                //
            } else {
                db.findOne({
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
         * Chargement de la BDD
         * Crée les index si ils n'existent pas
         *
         */
        init: function (database, callback) {
            try {
                dbfile = database;
                db = new nedb({
                    autoload: true,
                    filename: dbfile
                });
                db.loadDatabase(function (err) {
                    if (err) {
                        callback('ReadmePad is unable to load database: %s');
                    } else {
                        db.ensureIndex({
                            unique: true,
                            fieldName: 'project_id'
                        }, function (err) {
                            if (err) {
                                callback('ReadmePad is unable to create index on: %s database');
                            } else {
                                callback(false);
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
