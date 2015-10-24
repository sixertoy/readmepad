/*jslint indent: 4, nomen: true, plusplus: true */
/*globals require, module */
(function () {

    'use strict';

    var include = require('include'),
        Application = include('app');

    /**
     *
     * Retourne la liste des projets
     *
     * Renvoi:
     * - un code 503 si il y a une erreur requete BDD
     * - un code 200 si la BDD a repondu
     *
     */
    module.exports = function (req, res) {
        var model = Application.getInstance().getModel('project');
        model.findAll().then(function (data) {
            res.status(200).send(data || false);
        }, function (err) {
            res.sendStatus(503);
        });
    };

}());
