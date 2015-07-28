/*jslint indent: 4, nomen: true, plusplus: true */
/*globals require, module, console*/
(function () {

    'use strict';

    var router,
        __model = false,
        // requires
        fs = require('fs'),
        md5 = require('md5'),
        // path = require('path'),
        chalk = require('chalk'),
        lodash = require('lodash'),
        express = require('express');

    router = express.Router();

    /**
     *
     * Ouvre un projet
     *
     * @param path [String] Chemin absolu du projet
     *
     */
    router.post('/open', function (req, res) {
        if (!req.body.hasOwnProperty('project_path') || lodash.isEmpty(req.body.project_path)) {
            res.status(404).send({
                error: 'unable to parse project path'
            });
        } else {
            __model.findOneProject(req.body.project_path).then(function (data) {
                res.send(data);

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
        var options, project_path;
        if (!req.body.hasOwnProperty('project_path') || lodash.isEmpty(req.body.project_path)) {
            res.status(404).send({
                error: 'unable to parse project path'
            });
        } else {
            project_path = req.body.project_path;
            fs.stat(project_path, function (err) {
                if (err) {

                } else {

                }
            });
        }
    });

    router.post('/loadall', function () {});

    /**
     *
     * Cree un nouveau projet en BDD
     *
     */
    /*router.post('create', function (req, res) {
        // var obj, project_id, name,
            // project_path = path.normalize(req.body.path);
        //
        // console.log('on server');
        // lecture du dossier
        FS.stat(project_path, function (err) {
            if (err) {
                Facade.send404(res, err);
            } else {
                project_id = md5(project_path);
                //
                // recherche du projet
                // dans la bdd
                db.findOne({
                    project_id: project_id
                }, function (err, doc) {
                    // si erreur lors du chargemnent de la bdd
                    if (err) {
                        Facade.send404(res, err);
                    } else {
                        if (doc !== null) {
                            // si le document existe
                            // on renvoi le document
                            obj = Facade.document(doc);
                            Facade.ok(res, obj);

                        } else {
                            // si le document n'existe pas
                            // on recupere son arbre
                            // pages = Explorer.flatten(path);
                            scandir.exec(project_path).then(function (data) {
                                name = Object.keys(data)[0];
                                // on insere le nouveau document
                                // en bdd
                                db.insert({
                                    path: project_path,
                                    name: name,
                                    pages: data[name].files,
                                    project_id: project_id
                                }, function (err, newDoc) {
                                    if (err) {
                                        // si l'insertion a echouee
                                        Facade.send404(res, err);
                                    } else {
                                        // si l'insertion a reussie
                                        obj = Facade.document(newDoc);
                                        Facade.ok(res, obj);
                                    }
                                });

                            }, function (err) {
                                Facade.send404(res, err);
                            });
                        }
                    }
                });
                //
            }
        });

    });*/

    /**
     *
     * Charge la liste des projets en BDD
     *
     */
    /*router.get('load', function (req, res) {
        var obj, data = [];
        db.find({}, function (err, docs) {
            if (err) {
                // si l'insertion a echouee
                // Facade.send404(res, err);
            } else {
                docs.map(function (item) {
                    data.push({
                        name: item.name,
                        path: item.path
                    });
                });
                // Facade.ok(res, data);
            }
        });
    });*/

    module.exports = {
        model: function (model) {
            if (arguments.length > 0) {
                __model = model;
            }
            return __model;
        },
        router: router
    };

}());
