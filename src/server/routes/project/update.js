/*jslint indent: 4, nomen: true, plusplus: true */
/*globals require, module */
(function () {

    'use strict';

    var // variables
        Application,
        // requires
        include = require('include'),
        isstring = require('lodash.isstring'),
        // utils
        args = include('utils/args'),
        validate = include('utils/validate-args');

    /**
     *
     * Mise a jour d'un projet en BDD
     *
     * Renvoi:
     * - un code 503 si il y a une erreur sur la requete en BDD
     * - un code 400 si les arguments d'appel AJAX ne sont pas valides
     * - un code 201 si le projet a ete mis a jour
     * - un code 503 si aucun projet n'est present en BDD
     *
     */
    module.exports = function (req, res) {
        /*
        var model = Application.getModel('project'),
            valid = validate(args(req.body.pid, req.body.name), [isstring, isstring]);
        if (!valid) {
            res.sendStatus(400);
        } else {
            model.updateProject(req.body).then(function (count) {
                if (count > 0) {
                    res.sendStatus(201);
                } else {
                    res.sendStatus(503);
                }
            }, function (err) {
                res.sendStatus(503);
            });
        }
        */
    };

}());
