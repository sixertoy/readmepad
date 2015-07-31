/*jslint indent: 4, nomen: true, plusplus: true */
/*globals require, module, console*/
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

    router = express.Router();

    /**
     *
     * Ouvre un projet
     *
     * @param path [String] Chemin absolu du projet
     *
     */
    router.post('/open', function (req, res) {
        var valid = !req.body.hasOwnProperty('project_path') || !lodash.isString(req.body.project_path) || lodash.isEmpty(req.body.project_path.trim());
        if (valid) {
            res.status(404).send({
                error: 'unable to parse project path'
            });
        } else {
            req.body.project_path = req.body.project_path.trim();
            __model.findOneProject(__name, req.body.project_path).then(function (data) {
                res.send(data);

            }, function (err) {
                res.status(404).send({
                    error: 'unable to parse project path'
                });

            });
        }
    });


    router.post('/delete', function (req, res) {
        var valid = !req.body.hasOwnProperty('project_path') || !lodash.isString(req.body.project_path) || lodash.isEmpty(req.body.project_path.trim());
        if (valid) {
            res.status(404).send({
                error: 'unable to parse project path'
            });
        } else {
            req.body.project_path = req.body.project_path.trim();
            __model.deleteProject(__name, req.body.project_path).then(function (count) {
                res.send(count > 0);

            }, function (err) {
                res.status(404).send({
                    error: 'unable to parse project path'
                });

            });
        }
    });

    /**
     *
     * Creation d'un nouveau projet
     * Si le projet existe on retourne le projet
     *
     */
    router.post('/create', function (req, res) {
        var project_path, name,
            valid = !req.body.hasOwnProperty('project_path') || !lodash.isString(req.body.project_path) || lodash.isEmpty(req.body.project_path.trim());
        if (valid) {
            res.status(404).send({
                error: 'unable to parse project path'
            });
        } else {
            project_path = req.body.project_path.trim();
            fs.stat(project_path, function (err) {
                if (err) {
                    res.status(404).send({
                        error: 'unable to find project'
                    });
                } else {
                    __model.findOneProject(__name, project_path).then(function (doc) {
                        if (doc) {
                            // si le projet existe
                            res.send(doc);

                        } else {
                            // si le projet n'existe pas
                            // on cree un nouveau document en BDD
                            name = projectUtils.name(project_path);
                            __model.createProject(__name, name, project_path).then(function (doc) {
                                res.send(doc);
                            }, function () {
                                res.status(404).send({
                                    error: 'unable to create project: ' + project_path
                                });
                            });
                        }

                    }, function (err) {
                        res.status(404).send({
                            error: 'unable to explore project: ' + project_path
                        });
                    });
                }
            });
        }
    });

    router.get('/loadall', function (req, res) {
        __model.findAll(__name).then(function (data) {
            res.send(data);
        }, function (err) {
            res.status(404).send({
                error: 'unable to parse project path'
            });

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
