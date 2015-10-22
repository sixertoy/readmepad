/*jslint indent: 4, nomen: true, plusplus: true */
/*globals require, module, console */
(function () {

    'use strict';
    var // variables
        INSTANCE = false,
        Application,
        Enforcer = function () {},
        // requires
        Q = require('q'),
        path = require('path'),
        chalk = require('chalk');

    /**
     *
     * Constructeur
     *
     */
    Application = function (enforcer) {
        if (enforcer && enforcer instanceof Enforcer) {
            this._stores = {};
            this._server = false;
        } else {
            throw new Error('Application must not be called by his constructor');
        }
    };

    /**
     *
     * Retourne l'instance du serveur
     * Pour l'application
     *
     */
    Application.prototype.getServer = function () {
        return this._server;
    };

    /**
     *
     * Affecte l'instance du serveur
     * Pour l'application
     *
     */
    Application.prototype.setServer = function (server) {
        this._server = server;
        return this;
    };


    /**
     *
     * Il n'y a pas de modele MVC
     * Le controller est lie au modele
     *
     */
    Application.prototype.init = function (server, callback) {
        //initProjectBehaviors: function () {
        //var model = new ProjectModel();
        //this._stores['project'] = model;
        //var q = Q.defer();
        //var projectController = new ProjectController();
        //projectController.init(this._stores['project']);
        //Facade.server().use('/project', projectController.router());
        //return q.promise;
        //},
        this.setServer(server);
        callback(null);
    };

    /**
     *
     * Singleton
     *
     */
    module.exports = {
        getInstance: function () {
            if (!INSTANCE) {
                var enforcer = new Enforcer();
                INSTANCE = new Application(enforcer);
            }
            return INSTANCE;
        }
    };

}());