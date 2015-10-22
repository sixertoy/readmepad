/*jslint indent: 4, nomen: true, plusplus: true */
/*globals require, module */
(function () {

    'use strict';

    var Application = require('./../app').getInstance();

    /**
     *
     * Supprime un projet en BDD
     *
     * Renvoi:
     * - un code 503 si il y a une erreur requete BDD
     *
     */
    module.exports = function (req, res) {
        var model = Application.getModel('project');
        model.deleteProject(req.pid).then(function (count) {
            res.send((count > 0));
        }, function (err) {
            res.sendStatus(503);
        });
    };

}());
