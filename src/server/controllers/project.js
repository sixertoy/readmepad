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
        scandir = require('scandir-async').exec,
        validate = require('./../utils/validate-args').exec,

        /**
         *
         *
         *
         */
        controller = {

            _stubArguments: function(){
                return arguments;
            },

            create: function (req, res) {
                var pid, name, doc,
                    $this = this,
                    valid = validate(this._stubArguments(req.body.path, req.body.name), [_.isString, _.isString]);
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
                                        res.sendStatus(404);
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
                var project,
                    valid =
                    valid = validate(this._stubArguments(req.body.pid, req.body.name), [_.isString, _.isString]);
                if (!valid) {
                    res.sendStatus(400);
                } else {
                    project = {
                        name: req.body.name.trim(),
                        pid: req.body.pid.trim()
                    };
                    this.model().updateProject(project).then(function (count) {
                        if (count > 0) {
                            res.sendStatus(201);
                        } else {
                            res.sendStatus(403);
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
                var valid = validate(this._stubArguments(req.params.pid), [_.isString]);
                //
                if (!valid) {
                    res.sendStatus(400);
                } else {
                    this.model().deleteProject(req.params.pid).then(function (count) {
                        res.send((count > 0));
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
            loadAll: function (req, res) {
                this.model().findAll().then(function (data) {
                    res.status(200).send(data);
                }, function (err) {
                    res.sendStatus(503);
                });
            },

            open: function (req, res) {
                var project_path,
                    valid = validate(this._stubArguments(req.params.pid), [_.isString]);
                //
                if (!valid) {
                    res.sendStatus(400);
                } else {
                    this.model().findOneProject(req.params.pid).then(function (doc) {
                        if (doc) {
                            project_path = doc.path;
                            scandir(project_path, {
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
                }
            },

            _model: null,
            _router: null,

            model: function () {
                return this._model;
            },

            router: function () {
                return this._router;
            },

            init: function (model) {
                //
                // init du router
                this._model = model;
                this._router = express.Router({
                    caseSensitive: true
                });
                //
                // definitions des routes
                this._router.put('/update', this.update.bind(this));
                this._router.post('/create', this.create.bind(this));
                this._router.get('/loadall', this.loadAll.bind(this));
                this._router.get('/open/:pid', this.open.bind(this));
                this._router.delete('/delete/:pid', this.remove.bind(this));

            }
        },

        ProjectController = function () {};

    _.assign(ProjectController.prototype, controller);

    module.exports = ProjectController;

}());
