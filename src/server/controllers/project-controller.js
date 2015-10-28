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
    // circulars dependencies
        Application,
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
    
    ProjectController.prototype.init = function(){
        this._initRoutes();
        this._initParamsMiddleware();
    };

    ProjectController.prototype._initRoutes = function () {
        // ajout des routes de l'API
        this._router.get('/open', open);
        this._router.put('/update', update);
        this._router.post('/create', create);
        this._router.delete('/remove', remove);
        this._router.get('/collection', collection);
    };

    ProjectController.prototype._initParamsMiddleware = function () {
        var valid;
        // parse param pid
        this._router.param('pid', function (req, res, next, pid) {
            valid = validate(args(pid), [isstring]);
            req.pid = valid ? pid : false;
            next();
        });
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

    module.exports = ProjectController;
    Application = include('app');

}());
