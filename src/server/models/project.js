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
            path: 'string', // server/root/projects/path + project._id
        };

    store = {

        /**
         *
         * Mise a jour d'un projet
         * Mise a jour du nom du projet uniquement
         *
         */
        updateProject: function (name, params) {
            var q = Q.defer();
            if (arguments.length < 2) {
                q.reject(new Error('needs 2 arguments at least'));
                //
            } else {
                stores[name].update({
                    _id: params._id
                }, {
                    $set: {
                        name: params.name
                    }
                }, {}, function (err, count) {
                    if (err) {
                        q.reject(err);
                    } else {
                        stores[name].persistence.compactDatafile();
                        q.resolve(count);

                    }
                });
            }
            return q.promise;
        },

        /**
         *
         * Cree un projet en bdd
         *
         */
        createProject: function (dbname, doc) {
            var document,
                q = Q.defer();
            if (arguments.length < 2) {
                q.reject(new Error('needs 2 arguments at least'));
                //
            } else if (!_.isPlainObject(doc) || !doc.hasOwnProperty('path') || !doc.hasOwnProperty('name')) {
                q.reject(new Error('document is not valid'));

            } else {

                stores[dbname].insert(doc, function (err, res) {
                    if (err) {
                        q.reject(err);
                    } else {
                        if (res) {
                            stores[dbname].persistence.compactDatafile();
                            q.resolve(res);
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
        deleteProject: function (name, pid) {
            var q = Q.defer();
            if (arguments.length < 2) {
                q.reject(new Error('needs 2 argument at least'));
                //
            } else {
                stores[name].remove({
                    _id: pid
                }, function (err, count) {
                    if (err) {
                        q.reject(err);
                    } else {
                        stores[name].persistence.compactDatafile();
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
        findOneProject: function (dbname, pid) {
            var q = Q.defer();
            if (arguments.length < 2 || !_.isString(pid) || _.isEmpty(pid.trim())) {
                q.reject(new Error('needs 2 argument at least'));
                //
            } else {
                stores[dbname].findOne({
                    pid: pid
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
        findAll: function (dbname) {
            var q = Q.defer(),
                valid = arguments.length < 1 || !_.isString(dbname) || _.isEmpty(dbname.trim());
            if (valid) {
                q.reject(new Error('needs 1 argument at least'));
                //
            } else {
                stores[dbname].find({}, function (err, docs) {
                    if (err) {
                        q.reject(err);
                    } else {
                        q.resolve(docs);
                        /*
                        if (docs) {
                            if(docs.length){
                                q.resolve(docs);
                            } else {
                                q.resolve(false);
                            }
                        } else {
                            q.resolve(false);
                        }
                        */
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
        init: function (dbname, dbfile) {
            var q = Q.defer(),
                valid = validate(arguments, [_.isString, _.isString]);
            // verifie que les deux arguments sont des strings
            // et qu'ils ne sont pas vide
            if(!valid){
                q.reject(new Error('missing arguments'));
            } else {
                q.resolve(true);
            }
            /*
            fs.stat(dbfile, function(err){
                if(err){
                    // ne peut pas charger la bb
                    //
                } else {

                }
            });
            */
            return q.promise;
            /*
            stores[dbname] = new nedb({
                autoload: false,
                filename: dbfile
            });
            stores[dbname].loadDatabase(function (err) {
                if (err) {
                    winston.error('unable to load database: ' + dbname);
                    if (callback) {
                        callback(new Error('unable to load database: ' + dbname));
                    }
                } else {
                    winston.info('DataBase ' + dbname + ' loaded'); // @TODO replace by debug mode
                    if (callback) {
                        callback(false);
                    }
                }
            });
            */
        }
    };

    module.exports = store;

}());
