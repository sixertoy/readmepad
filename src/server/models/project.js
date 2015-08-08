/*jslint indent: 4, nomen: true, plusplus: true */
/*globals require, module, console */
(function () {

    'use strict';

    var db, store, dbfile,
        stores = {},
        Q = require('q'),
        fs = require('fs'),
        md5 = require('md5'),
        _ = require('lodash'),
        nedb = require('nedb'),
        winston = require('winston'),
        filenamify = require('filenamify'),
        validate = require('../utils/validate-args'),
        document = {
            _id: null,
            name: 'string',
            path: 'string' // server/root/projects/path + project._id
        };

    store = {

        /**
         *
         * Cree un projet en bdd
         *
         */
        createProject: function (dbname, name, path) {
            var document,
                q = Q.defer(),
                valid = validate(arguments, [_.isString, _.isString, _.isString]);
            if (!valid) {
                q.reject(new Error('missing arguments'));
            } else {
                stores[dbname].insert({
                    name: name,
                    path: path,
                    pid: md5(name)
                }, function (err, project) {
                    if (err) {
                        q.reject(err.errorType === 'uniqueViolated' ? false : err);
                    } else {
                        stores[dbname].persistence.compactDatafile();
                        q.resolve(project);
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
        deleteProject: function (name, pid) {
            var q = Q.defer(),
                valid = validate(arguments, [_.isString, _.isString]);
            if (!valid) {
                q.reject(new Error('missing arguments'));
                //
            } else {
                stores[name].remove({
                    _id: pid
                }, function (err, count) {
                    if (err) {
                        q.reject(err);
                    } else {
                        stores[name].persistence.compactDatafile();
                        q.resolve(count > 0);
                    }
                });
            }
            return q.promise;
        },

        /**
         *
         * Mise a jour d'un projet
         * Mise a jour du nom du projet uniquement
         *
         */
        updateProject: function (name, params) {
            var pid,
                q = Q.defer(),
                valid = validate(arguments, [_.isString, _.isPlainObject]);
            if (!valid && !_.has(params, ['_id', 'name'])) {
                q.reject(new Error('missing arguments'));
            } else {
                pid = params._id;
                _.omit(params, ['_id']);
                stores[name].update({
                    _id: pid
                }, {
                    $set: params
                }, {}, function (err, count) {
                    if (err) {
                        q.reject(err);
                    } else {
                        stores[name].persistence.compactDatafile();
                        q.resolve(count > 0);
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
        findOneProject: function (dbname, pid) {
            var q = Q.defer(),
                valid = validate(arguments, [_.isString, _.isString]);
            if (!valid) {
                q.reject(new Error('missing arguments'));
            } else {
                stores[dbname].findOne({
                    _id: pid
                }, function (err, doc) {
                    if (err) {
                        q.reject(err);
                    } else {
                        q.resolve(false);
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
        findAll: function (dbname) {
            var q = Q.defer(),
                valid = validate(arguments, [_.isString]);
            if (!valid) {
                q.reject(new Error('missing arguments'));
            } else {
                stores[dbname].find({}, function (err, docs) {
                    if (err) {
                        q.reject(err);
                    } else {
                        q.resolve(false);
                    }
                });
            }
            return q.promise;
        },

        /**
         *
         *
         *
         */
        getStore: function (dbname) {
            if (arguments.length < 1) {
                return stores;
            } else {
                var valid = validate(arguments, [_.isString]);
                if (!valid || !stores.hasOwnProperty(dbname)) {
                    return false;
                } else {
                    return stores[dbname];
                }
            }
        },

        /**
         *
         * Chargement de la BDD
         * Crée les index si ils n'existent pas
         *
         */
        init: function (dbname, dbfile) {
            // @todo implement url validation
            var q = Q.defer(),
                valid = validate(arguments, [_.isString, _.isString]);
            // verifie que les deux arguments sont des strings
            // et qu'ils ne sont pas vide
            if (!valid) {
                q.reject(new Error('missing arguments'));
            } else {
                stores[dbname] = new nedb({
                    autoload: false,
                    filename: dbfile
                });
                stores[dbname].loadDatabase(function (err) {
                    if (err) {
                        var msg = 'unable to load database: ' + dbname;
                        winston.error(msg);
                        q.reject(new Error(msg));
                    } else {
                        stores[dbname].ensureIndex({
                            unique: true,
                            fieldName: 'pid'
                        }, function (err) {
                            if (err) {
                                q.reject(new Error('ReadmePad is unable to create index on: %s database'));
                            } else {
                                winston.info('DataBase ' + dbname + ' loaded'); // @TODO replace by debug mode
                                q.resolve(true);
                            }
                        });
                    }
                });
            }
            return q.promise;
        }
    };

    module.exports = store;

}());
