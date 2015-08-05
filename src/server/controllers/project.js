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

    var router,
        __name = false,
        __model = false,
        // requires
        fs = require('fs'),
        md5 = require('md5'),
        path = require('path'),
        chalk = require('chalk'),
        lodash = require('lodash'),
        express = require('express'),
        scandir = require('scandir-async').exec,
        projectUtils = require('./../helpers/project-utils');

    router = express.Router({
        caseSensitive: true
    });

    /**
     *
     * Ouvre un projet
     *
     * @param path [String] Chemin absolu du projet
     *
     */
    router.get('/open/:project_id', function (req, res) {
        var project_path,
            project_id = req.params.project_id;
        __model.findOneProject(__name, project_id).then(function (doc) {
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
    });


    router.delete('/delete/:project_id', function (req, res) {
        var project_id = req.params.project_id;
        __model.deleteProject(__name, project_id).then(function (count) {
            res.send((count > 0));
        }, function (err) {
            res.sendStatus(503);
        });
    });

    router.post('/create', function (req, res) {
        var project_id, name,
            valid = !req.body.hasOwnProperty('uri') || !lodash.isString(req.body.uri) || lodash.isEmpty(req.body.uri);
        if (valid) {
            res.sendStatus(400);
        } else {
            fs.stat(req.body.uri, function (err) {
                if (err) {
                    res.sendStatus(403);
                } else {
                    project_id = md5(req.body.uri);
                    __model.findOneProject(__name, project_id).then(function (doc) {
                        if (doc) {
                            // si le projet existe
                            res.status(200).send(doc);
                        } else {
                            // si le projet n'existe pas
                            // on cree un nouveau document en BDD
                            name = lodash.isEmpty(req.body.name) ? projectUtils.name(req.body.uri) : req.body.name;
                            __model.createProject(__name, name, req.body.uri).then(function (doc) {
                                res.status(201).send(doc);
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
    });

    router.put('/update', function (req, res) {
        var project,
            valid = !req.body.hasOwnProperty('project') || lodash.isEmpty(req.body.project) || !lodash.isPlainObject(req.body.project);
        if (valid) {
            res.sendStatus(400);
        } else {
            project = req.body.project;
            __model.updateProject(__name, project).then(function (count) {
                if (count > 0) {
                    res.sendStatus(201);
                } else {
                    res.sendStatus(403);
                }
            }, function (err) {
                res.sendStatus(503);
            });
        }
    });

    router.get('/loadall', function (req, res) {
        __model.findAll(__name).then(function (data) {
            res.status(200).send(data);
        }, function (err) {
            res.sendStatus(503);
        });
    });

    module.exports = {
        model: function (model) {
            if (arguments.length > 0) {
                __model = model;
            }
            return __model;
        },
        name: function (name) {
            if (arguments.length > 0) {
                __name = name;
            }
            return __name;
        },
        router: router
    };

}());
