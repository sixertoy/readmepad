/*jslint indent: 4, nomen: true, plusplus: true */
/*globals require, module, console */
(function () {

    'use strict';
    var // variables
        ProjectController,
        Singleton = false,
        // requires
        Q = require('q'),
        path = require('path'),
        chalk = require('chalk'),
        include = require('include'),
        isstring = require('lodash.isstring');

    /**
     *
     * Constructeur
     *
     */
    function Application(server) {
        if (!server) {
            throw new Error('missing arguments');
        }
        Singleton = this;
        this._models = {};
        this._server = server;
        this._controllers = {};
    }

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
        if (arguments.length < 1 || !isstring(name) || !this._models.hasOwnProperty(name) || !this._models[name]) {
            throw new Error('Unable to load model: ' + name);
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
        if (arguments.length < 1 || !isstring(name) || !this._controllers.hasOwnProperty(name) || !this._controllers[name]) {
            throw new Error('Unable to load controller: ' + name);
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
    Application.prototype.init = function (callback) {
        if (arguments.length < 1 || typeof (callback) !== 'function') {
            throw new Error('missing arguments');
        }
        var ctrl, name;
        //
        // ProjectController
        name = 'project';
        ctrl = new ProjectController(this, name);
        this._controllers[name] = ctrl;
        this._server.use('/' + name, ctrl.getRouter());
        //
        //
        callback(null);
    };

    module.exports = Application;
    ProjectController = include('controllers/project-controller');

}());
