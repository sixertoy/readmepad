/*jslint indent: 4, nomen: true, plusplus: true */
/*globals require, module*/
(function(){

    'use strict';

    var router,
        // requires
        // md5 = require('md5'),
        // path = require('path'),
        express = require('express');

    router = express.Router();

    router.post('/create', function () {
    });

    router.post('/loadall', function () {
    });

    router.post('/open', function () {
    });

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

    /**
     *
     * Ouvre un projet
     *
     * @param path [String] Chemin absolu du projet
     *
     */
    /*router.post('open', function (req, res) {
        var obj,
            items = [],
            path = req.body.path,
            options = {
                project_id: md5(path)
            };
        db.findOne(options, function (err, doc) {
            if (err) {
                // si l'insertion a echouee
                // Facade.error(res, err);
            } else {
                obj = Facade.document(doc);
                // Facade.ok(res, obj);
            }
        });
    });*/

    module.exports = router;

}());
