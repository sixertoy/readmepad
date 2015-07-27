/*jslint indent: 4, nomen: true */
/*global require, __dirname */
(function () {

    'use strict';

    var // variables
        server, app, dbfile, favicon, www,
        // constants
        HTTP_PORT = 9080,
        DATABASE = './db.nedb',
        // requires
        path = require('path'),
        multer = require('multer'),
        Express = require('express'),
        bodyParser = require('body-parser'),
        serveFavicon = require('serve-favicon'),
        // scandirAsync = require('scandir-async'),
        // FS = require('fs'),
        // md5 = require('md5'),
        //
        // Facade = require('./facade'),
        store = require('./herlpers/store'),
        projectController = require('./controllers/project'),
        documentController = require('./controllers/document');
    //
    // creation de la BDD
    // creation du serveur
    server = new Express();
    //
    // le serveur express sert des ressouces statiques
    www = path.join(__dirname, '..', 'public', 'html');
    server.use(Express.static(www));
    //
    // express middlewares
    favicon = path.join(www, 'favicon.ico');
    favicon = serveFavicon(favicon); // favison du client
    server.use(favicon); // utilisation du favicon
    server.use(multer()); // for parsing multipart/form-data
    server.use(bodyParser.json()); // for parsing application/json
    server.use(bodyParser.urlencoded({ // for parsing application/x-www-form-urlencoded
        extended: true
    }));
    //
    // routers/controllers
    app.use('/project', projectController);
    app.use('/document', documentController);
    //
    // init de la bdd
    dbfile = path.join(__dirname, DATABASE);
    store.init(dbfile);
    store.load(server, HTTP_PORT);

}());
