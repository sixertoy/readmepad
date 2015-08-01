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
    router.get('/open', function (req, res) {
        var project_path,
            valid = !req.body.hasOwnProperty('project_path') || !lodash.isString(req.body.project_path) || lodash.isEmpty(req.body.project_path.trim());
        if (valid) {
            res.status(400).send('invalid arguments');
        } else {
            project_path = req.body.project_path.trim();
            __model.findOneProject(__name, project_path).then(function (doc) {
                if (doc) {
                    scandir(project_path).then(function(data){
                        res.status(200).send(data);
                    }, function(err){
                        res.status(500).send();
                    });
                } else {
                    res.status(404).send('unable to find project');
                }
            }, function (err) {
                res.status(503).send(err.message);
            });
        }
    });


    router.delete('/delete', function (req, res) {
        var project_path,
            valid = !req.body.hasOwnProperty('project_path') || !lodash.isString(req.body.project_path) || lodash.isEmpty(req.body.project_path.trim());
        if (valid) {
            res.status(400).send('invalid arguments');
        } else {
            project_path = req.body.project_path.trim();
            __model.deleteProject(__name, project_path).then(function (count) {
                if(count > 0){
                    res.status(200).send();
                } else {
                    res.status(204).send();
                }
            }, function (err) {
                res.status(503).send(err.message);
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
            res.status(400).send('invalid arguments');
        } else {
            project_path = req.body.project_path.trim();
            fs.stat(project_path, function (err) {
                if (err) {
                    res.status(403).send(err.message);
                } else {
                    __model.findOneProject(__name, project_path).then(function (doc) {
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
                                res.status(404).send(err.message);
                            });
                        }

                    }, function (err) {
                        res.status(503).send(err.message);
                    });
                }
            });
        }
    });

    router.get('/loadall', function (req, res) {
        __model.findAll(__name).then(function (data) {
            res.status(200).send(data);
        }, function (err) {
            res.status(503).send(err.message);
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
