/**
 *
 * HTTP Status Code
 * @see http://www.restapitutorial.com/httpstatuscodes.html
 *
 *
 */
/*jslint indent: 4, nomen: true, plusplus: true */
/*globals require, module, console*/
(function () {

    'use strict';

    var // variables
        Application, Facade,
        // requires
        include = require('include'),
        express = require('express'),
        isstring = require('lodash.isstring'),
        //scandir = require('scandir-async').exec,
        // utils
        args = include('utils/args'),
        validate = include('utils/validate-args').exec,
        // routes
        open = include('routes/project/open'),
        update = include('routes/project/update'),
        create = include('routes/project/create'),
        remove = include('routes/project/remove'),
        collection = include('routes/project/collection');

    /**
     *
     * Constructeur
     *
     */
    function ProjectController(app, name) {
        if (arguments.length < 2 || !app || !(app instanceof Application)) {
            throw new Error('missing arguments');
        }
        this._app = app;
        this._name = name;
        this._model = false;
        this._router = express.Router({
            caseSensitive: true
        });
    }

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
     * 
     */
    ProjectController.prototype.getName = function () {
        return this._name;
    }

    ProjectController.prototype.init = function () {
        this._initRoutes();
        this._initRoutesParams();
    };

    ProjectController.prototype._initRoutes = function () {
        // ajout des routes de l'API
        this._router.post('/create', create);
        this._router.get('/collection', collection);
        // params needed
        this._router.get('/open/:id', open);
        this._router.put('/update/:id', update);
        this._router.delete('/remove/:id', remove);
    };

    ProjectController.prototype._initRoutesParams = function () {
        var valid;
        // parse param pid
        this._router.param('id', function (req, res, next, id) {
            valid = validate(args(id), [isstring]);
            if(!valid){
                res.sendStatus(400);
            } else {
                req.id = id;
                next();
            }
        });
    };

    module.exports = ProjectController;
    Facade = include('facade');
    Application = include('app');

}());
