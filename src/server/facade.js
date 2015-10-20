/*jslint indent: 4, nomen: true, plusplus: true */
/*globals require, module, console */
(function () {

    'use strict';
    var Q = require('q'),
        path = require('path'),
        chalk = require('chalk'),
        //
        ProjectModel = require('./models/project'),
        ProjectController = require('./controllers/project'),

        Facade = {

            _stores: {},
            _server: null,

            server: function (value) {
                if (value) {
                    Facade._server = value;
                }
                return Facade._server;
            },

            initProjectBehaviors: function () {
                /*
                var model = new ProjectModel();
                this._stores['project'] = model;
                var q = Q.defer();
                var projectController = new ProjectController();
                projectController.init(this._stores['project']);
                Facade.server().use('/project', projectController.router());
                return q.promise;
                */
            },

            /**
             *
             * Il n'y a pas de modele MVC
             * Le controller est lie au modele
             *
             */
            start: function (server) {
                var q = Q.defer();
                if (Facade.server(server) === null) {
                    q.reject(new Error('no server setted'));
                    // error
                } else {
                    Facade.initProjectBehaviors();
                    // q.resolve();
                }
                return q.promise;
            }

        };

    module.exports = Facade;

}());

//
// routers/controllers
// server.use('/document', documentController.router);
//
//
// init de la bdd
// dbfile = path.join(__dirname, database);
//
/*
projectController.init(store, dbfile).then(function () {

    // init de la dbb

}, function () {

});
*/
/*
store.init('project', dbfile, function (err) {
    if (err) {
        console.log(err, dbfile);
    } else {
        // ajout du modele au controlleur
        projectController.init(store, 'project');
        // projectController.name('project');
        // documentController.model(store);
    }
});
*/
