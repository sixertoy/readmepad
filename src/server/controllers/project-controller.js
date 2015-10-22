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

    var // variables
        instance,
        ProjectController,
        Enforcer = function () {},
        // requires
        fs = require('fs'),
        md5 = require('md5'),
        path = require('path'),
        chalk = require('chalk'),
        express = require('express'),
        isstring = require('lodash.isstring'),
        //scandir = require('scandir-async').exec,
        // utils
        args = require('./../utils/args'),
        validate = require('./../utils/validate-args').exec,
        // routes
        open = require('./../routes/project/open'),
        create = require('./../routes/project/create'),
        remove = require('./../routes/project/remove'),
        update = require('./../routes/project/update'),
        collection = require('./../routes/project/collection');

    /**
     *
     * Init du router du controller
     * Permet de faire la validation du PID en amont
     * de l'appel de la methode des routes
     *
     * @TODO place in a super class for a route class
     *
     */
    function _initRouter() {
        var valid, router;
        // init du router du controller
        router = express.Router({
            caseSensitive: true
        });
        // parse param pid
        router.param('pid', function (req, res, next, pid) {
            valid = validate(args(pid), [isstring]);
            req.pid = valid ? pid : false;
            next();
        });
        return router;
    }

    /**
     *
     * Constructeur
     *
     */
    ProjectController = function () {
        this._model = false;
        this._router = _initRouter();
    };

    /**
     *
     * Retourne le router express.js
     * pour le controller
     *
     */
    ProjectController.prototype.getRouter = function () {
        return this._router;
    };

    /**
     *
     * Init des sous route de l'API
     * Retourne le router pour le controller
     *
     */
    ProjectController.prototype.init = function () {
        // ajout des routes de l'API
        this._router.get('/open', open);
        this._router.put('/update', update);
        this._router.post('/create', create);
        this._router.delete('/remove', remove);
        this._router.get('/collection', collection);
    };

    /**
     *
     * Singleton
     *
     */
    module.exports = {
        getInstance: function () {
            if (!instance) {
                var enforcer = new Enforcer();
                instance = new ProjectController(enforcer);
            }
            return instance;
        }
    };

}());
