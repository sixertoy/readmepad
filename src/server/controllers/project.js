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
                scandir(project_path).then(function (data) {
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
            if (count > 0) {
                res.sendStatus(200);
            } else {
                res.sendStatus(204);
            }
        }, function (err) {
            res.sendStatus(503);
        });
    });

    router.post('/create', function (req, res) {
        var project_path, project_id, name,
            valid = !req.body.hasOwnProperty('project_path') || !lodash.isString(req.body.project_path) || lodash.isEmpty(req.body.project_path);
        if (valid) {
            res.sendStatus(400);
        } else {
            project_path = req.body.project_path;
            fs.stat(project_path, function (err) {
                if (err) {
                    res.sendStatus(403);
                } else {
                    project_id = md5(project_path);
                    __model.findOneProject(__name, project_id).then(function (doc) {
                        if (doc) {
                            // si le projet existe
                            res.status(200).send(doc);
                        } else {
                            // si le projet n'existe pas
                            // on cree un nouveau document en BDD
                            name = projectUtils.name(project_path);
                            __model.createProject(__name, name, project_path).then(function (doc) {
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
