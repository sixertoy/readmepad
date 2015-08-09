/*jslint indent: 4, nomen: true, plusplus: true */
/*globals require, module, console */
(function () {

    'use strict';

    var dbfile,
        Q = require('q'),
        fs = require('fs'),
        md5 = require('md5'),
        _ = require('lodash'),
        Datastore = require('nedb'),
        winston = require('winston'),
        filenamify = require('filenamify'),
        validate = require('../utils/validate-args').exec,
        //
        // description d'une entite projet en BDD
        document = {
            _id: null,
            pid: 'string', // unique
            name: 'string', // nom ui du projet
            path: 'string' // md5(name)
        },

        model = {

            _db: null,

            /**
             *
             * Cree un projet en bdd
             *
             */
            createProject: function (name, path) {
                var document,
                    $this = this,
                    q = Q.defer(),
                    valid = validate(arguments, [_.isString, _.isString]);
                if (!valid) {
                    q.reject(new Error('missing arguments'));
                } else {
                    $this._db.insert({
                        name: name,
                        path: path,
                        pid: md5(name)
                    }, function (err, project) {
                        if (err) {
                            q.reject(err.errorType === 'uniqueViolated' ? false : err);
                        } else {
                            $this._db.persistence.compactDatafile();
                            q.resolve(project);
                        }
                    });
                }
                return q.promise;
            },

            /**
             *
             * Mise a jour d'un projet
             * Mise a jour des props contenus dans paramas
             *
             * @param upobject [object] props a mettre a jour
             *
             */
            updateProject: function (upobject) {
                var pid,
                    $this = this,
                    q = Q.defer(),
                    valid = validate(arguments, [_.isPlainObject]);
                if (!valid || !_.has(upobject, ['_id'])) {
                    q.reject(new Error('missing arguments'));
                } else {
                    pid = upobject._id;
                    upobject = _.omit(upobject, '_id');
                    if (!_.keys(upobject).length) {
                        q.reject(new Error('nothing to update'));
                    } else {
                        if (_.has(upobject, ['name'])) {
                            upobject.path = md5(upobject.name);
                        }
                        $this._db.update({
                            _id: pid
                        }, {
                            $set: upobject
                        }, {}, function (err, count) {
                            if (err) {
                                q.reject(err);
                            } else {
                                $this._db.persistence.compactDatafile();
                                q.resolve(count > 0);
                            }
                        });
                    }
                }
                return q.promise;
            },

            /**
             *
             * Supprime un projet de la bdd
             *
             */
            deleteProject: function (pid) {
                var q = Q.defer(),
                    $this = this,
                    valid = validate(arguments, [_.isString]);
                if (!valid) {
                    q.reject(new Error('missing arguments'));
                    //
                } else {
                    $this._db.remove({
                        _id: pid
                    }, function (err, count) {
                        if (err) {
                            q.reject(err);
                        } else {
                            $this._db.persistence.compactDatafile();
                            q.resolve(count > 0);
                        }
                    });
                }
                return q.promise;
            },

            /**
             *
             * Retourne une entite projet
             * Si le projet n'existe pas retourne false
             *
             * @param pid [string] id setted par nedb a la creation du projet
             *
             */
            findOneProject: function (pid) {
                var q = Q.defer(),
                    $this = this,
                    valid = validate(arguments, [_.isString]);
                if (!valid) {
                    q.reject(new Error('missing arguments'));
                } else {
                    $this._db.findOne({
                        _id: pid
                    }, function (err, document) {
                        if (err) {
                            q.reject(err);
                        } else {
                            q.resolve(document ? document : false);
                        }
                    });
                }
                return q.promise;
            },

            /**
             *
             * Retourne la liste de tous les projets en BDD
             * Si la liste est vide retourne false
             *
             */
            findAll: function () {
                var q = Q.defer(),
                    $this = this;
                $this._db.find({}, function (err, documents) {
                    if (err) {
                        q.reject(err);
                    } else {
                        q.resolve(documents.length ? documents : false);
                    }
                });
                return q.promise;
            },

            /**
             *
             *
             *
             */
            store: function () {
                return this._db;
            },

            /**
             *
             * Chargement de la BDD
             * Crée les index si ils n'existent pas
             *
             */
            init: function (dbfile) {
                // @todo implement url validation
                var q = Q.defer(),
                    $this = this,
                    valid = validate(arguments, [_.isString]);
                // verifie que les deux arguments sont des strings
                // et qu'ils ne sont pas vide
                if (!valid) {
                    q.reject(new Error('missing arguments'));
                } else {
                    $this._db = new Datastore({
                        autoload: false,
                        filename: dbfile
                    });
                    $this._db.loadDatabase(function (err) {
                        if (err) {
                            var msg = 'unable to load database: ' + dbfile;
                            winston.error(msg);
                            q.reject(new Error(msg));
                        } else {
                            $this._db.ensureIndex({
                                unique: true,
                                fieldName: 'pid'
                            }, function (err) {
                                if (err) {
                                    q.reject(new Error('ReadmePad is unable to create index on: %s database'));
                                } else {
                                    winston.info('DataBase ' + dbfile + ' loaded'); // @TODO replace by debug mode
                                    q.resolve($this._db);
                                }
                            });
                        }
                    });
                }
                return q.promise;
            }
        },

        ProjectModel = function () {};

    _.assign(ProjectModel.prototype, model);

    module.exports = ProjectModel;

}());
