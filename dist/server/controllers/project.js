/*jslint indent: 4, nomen: true, plusplus: true */
/*globals require, module, console*/
/**
 *
 * HTTP Status Code
 * @see http://www.restapitutorial.com/httpstatuscodes.html
 *
 *
 */
(function () {

    'use strict';

    var // requires
        fs = require('fs'),
        md5 = require('md5'),
        _ = require('lodash'),
        path = require('path'),
        chalk = require('chalk'),
        express = require('express'),
        isstring = require('lodash.isstring'),
        scandir = require('scandir-async').exec,
        validate = require('./../utils/validate-args').exec,

        /**
         *
         *
         *
         */
        controller = {

            _stubArguments: function () {
                return arguments;
            },

            create: function (req, res) {
                var pid, name, doc, valid,
                    $this = this,
                    stubs = this._stubArguments(req.body.path, req.body.name);
                //
                valid = validate(stubs, [isstring, isstring]);
                //
                if (!valid) {
                    res.sendStatus(400);
                } else {
                    fs.stat(req.body.path, function (err) {
                        if (err) {
                            res.sendStatus(403);
                        } else {
                            pid = md5(req.body.path);
                            $this.model().findOneProject(pid).then(function (document) {
                                if (document) {
                                    // si le projet existe
                                    res.status(200).send(document);
                                } else {
                                    // si le projet n'existe pas
                                    // on cree un nouveau document en BDD
                                    doc = {
                                        name: req.body.name.trim(),
                                        path: req.body.path.trim()
                                    };
                                    $this.model().createProject(doc).then(function (document) {
                                        res.status(201).send(document);
                                    }, function (err) {
                                        res.sendStatus(503);
                                    });

                                }
                            }, function (err) {
                                res.sendStatus(503);
                            });
                        }
                    });
                }
            },

            update: function (req, res) {
                var valid = validate(this._stubArguments(req.body.pid, req.body.name), [_.isString, _.isString]);
                if (!valid) {
                    res.sendStatus(400);
                } else {
                    this.model().updateProject(req.body).then(function (count) {
                        if (count > 0) {
                            res.sendStatus(201);
                        } else {
                            res.sendStatus(503);
                        }
                    }, function (err) {
                        res.sendStatus(503);
                    });
                }
            },

            /**
             *
             *
             *
             */
            remove: function (req, res) {
                this.model().deleteProject(req.pid).then(function (count) {
                    res.send((count > 0));
                }, function (err) {
                    res.sendStatus(503);
                });
            },

            /**
             *
             * Charge tous les projets en BDD
             *
             */
            loadAll: function (req, res) {
                this.model().findAll().then(function (data) {
                    res.status(200).send(data || false);
                }, function (err) {
                    res.sendStatus(503);
                });
            },

            /**
             *
             * Ouverture d'un projet
             *
             * @param pid [string]
             *
             */
            open: function (req, res) {
                this.model().findOneProject(req.pid).then(function (doc) {
                    if (doc) {
                        scandir(doc.path, {
                            sorted: true
                        }).then(function (data) {
                            res.send(data);
                        }, function (err) {
                            res.sendStatus(503);
                        });
                    } else {
                        // if project doesn't exists
                        res.sendStatus(204);
                    }
                }, function (err) {
                    res.sendStatus(503);
                });
            },

            _model: null,
            _router: null,

            model: function () {
                return this._model;
            },

            router: function () {
                return this._router;
            },

            /**
             *
             * Prevalidation des parametres des routes
             *
             */
            registerRoutesParams: function () {
                var valid,
                    $this = this;
                // pid
                this._router.param('pid', function (req, res, next, pid) {
                    valid = validate($this._stubArguments(pid), [_.isString]);
                    req.pid = valid ? pid : false;
                    next();
                });
            },

            /**
             *
             * Init du router et des routes
             *
             */
            init: function (model) {
                //
                // init du router
                this._model = model;
                this._router = express.Router({
                    caseSensitive: true
                });
                //
                this.registerRoutesParams();
                //
                // @TODO use map routes
                // @see https://github.com/strongloop/express/blob/master/examples/route-map/index.js
                //
                // definitions des routes
                this._router.post('/create', this.create.bind(this));
                this._router.put('/update/', this.update.bind(this));
                this._router.get('/open/:pid', this.open.bind(this));
                this._router.get('/loadall', this.loadAll.bind(this));
                this._router.delete('/delete/:pid', this.remove.bind(this));

            }
        },

        ProjectController = function () {};

    _.assign(ProjectController.prototype, controller);

    module.exports = ProjectController;

}());
