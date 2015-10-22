/*jslint indent: 4, nomen: true, plusplus: true */
/*globals require, module */
(function () {

    'use strict';

    var // requires
        FS = require('fs'),
        md5 = require('md5'),
        isstring = require('lodash.isstring'),
        // utils
        stubs = require('./../../utils/args'),
        validate = require('./../../utils/validate-args'),
        //
        Application = require('./../../app').getInstance();

    module.exports = function (req, res) {
        var pid, name, doc, valid,
            $this = this,
            model = Application.getModel('project'),
            stubs = this._stubArguments(req.body.path, req.body.name);
        //
        // validation des arguments
        // de l'appel AJAX
        valid = validate(stubs, [isstring, isstring]);
        if (!valid) {
            res.sendStatus(400);
            return false;
        }
        //
        //
        FS.stat(req.body.path, function (err) {
            if (err) {
                res.sendStatus(403);
            } else {
                pid = md5(req.body.path);
                model.findOneProject(pid).then(function (document) {
                    if (document) {
                        //
                        // si le projet existe
                        // on retourne le project existant
                        res.status(200).send(document);
                    } else {
                        //
                        // si le projet n'existe pas
                        // on cree un nouveau document
                        doc = {
                            name: req.body.name.trim(),
                            path: req.body.path.trim()
                        };
                        //
                        // on insere le nouveau document
                        // en BDD
                        model.createProject(doc).then(function (document) {
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

    };

}());
