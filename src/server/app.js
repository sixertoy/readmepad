/*jslint indent: 4, nomen: true, plusplus: true */
/*globals require, module, console */
(function () {

    'use strict';
    var // variables
        Application,
        instance = false,
        Enforcer = function () {},
        // requires
        Q = require('q'),
        path = require('path'),
        chalk = require('chalk'),
        isstring = require('lodash.isstring'),
        //
        ProjectController = require('./controllers/project-controller'),

    /**
     *
     * Constructeur
     *
     */
    Application = function (enforcer) {
        if (enforcer && enforcer instanceof Enforcer) {
            this._models = {};
            this._server = false;
            this._controllers = {};
        } else {
            throw new Error('Application.getInstance()');
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
     * Retourne un model
     * par son namespace
     *
     * Renvoi une erreur si
     * - le param name n'est pas defini
     * - le param name n'est pas une string
     * - la map ne contient pas le model pour le NS
     * - le model defini est falsy
     *
     */
    Application.prototype.getModel = function (name) {
        if(arguments.length < 1 || !isstring(name) || !this._models.hasOwnProperty(name) || !this._models[name]){
            throw new Error('Unable to load model:' + name);
        }
        return this._models[name];
    };

    /**
     *
     * Retourne un controller
     * par son namespace
     *
     * Renvoi une erreur si
     * - le param name n'est pas defini
     * - le param name n'est pas une string
     * - la map ne contient pas le controller pour le NS
     * - le controller defini est falsy
     *
     */
    Application.prototype.getController = function (name) {
        if(arguments.length < 1 || !isstring(name) || !this._controllers.hasOwnProperty(name) || !this._controllers[name]){
            throw new Error('Unable to load controller:' + name);
        }
        return this._controllers[name];
    };


    /**
     *
     * Il n'y a pas de modele MVC
     * Le controller est lie au modele
     *
     * Renvoi une erreur si
     * - server et callback ne sont pas definis
     * - callback n'est pas une fonction
     *
     */
    Application.prototype.init = function (server, callback) {
        var controller, router, model, name;
        //
        if(arguments.length < 2 || typeof(callback) !== 'function'){
            throw new Error('missing arguments');
        }
        // affecte le serveur
        // a l'application
        this._server = server;
        //
        // init du router pour les objets projets
        name = 'project';
        controller = ProjectController.getInstance();
        controller.init();
        server.use('/' + name, controller.getRouter());
        this._models[name] = false;
        this._controllers[name] = controller;
        //
        callback(null);
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
                instance = new Application(enforcer);
            }
            return instance;
        }
    };

}());
