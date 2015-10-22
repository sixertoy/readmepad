/*jslint indent: 4, nomen: true, plusplus: true */
/*globals require, module */
(function () {

    'use strict';

    var Application = require('./../app').getInstance();

    /**
     *
     * Retourne un projet par son PID
     *
     * Renvoi:
     * - un code 503 si il y a erreur lors de la requete en BDD
     * - un code 204 si le projet n'existe pas
     * - un objet si le projet existe
     *
     */
    module.exports = function (req, res) {
        var model = Application.getModel('project');
        model.findOneProject(req.pid).then(function (doc) {
            if (!doc) {
                // if project doesn't exists
                res.sendStatus(204);
            } else {
                /*
                scandir(doc.path, {
                    sorted: true
                }).then(function (data) {
                    res.send(data);
                }, function (err) {
                    res.sendStatus(503);
                });
                */
            }
        }, function (err) {
            res.sendStatus(503);
        });
    };

}());
