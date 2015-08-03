/*jslint indent: 4, nomen: true */
/*global require, __dirname */
(function () {

    'use strict';

    var // variables
        server, dbfile, favicon, www,
        // constants
        http_port = 9080,
        database = './db.nedb',
        // requires
        path = require('path'),
        multer = require('multer'),
        express = require('express'),
        bodyParser = require('body-parser'),
        compression = require('compression'),
        serveFavicon = require('serve-favicon'),
        // scandirAsync = require('scandir-async'),
        // FS = require('fs'),
        // md5 = require('md5'),
        //
        // Facade = require('./facade'),
        store = require('./models/store'),
        www = path.join(__dirname, '..', 'public', 'html'),
        projectController = require('./controllers/project');
    // documentController = require('./controllers/document')
    //
    // creation de la BDD
    // creation du serveur
    server = express();
    //
    // express middlewares
    favicon = path.join(www, 'favicon.ico');
    favicon = serveFavicon(favicon); // favicon du client
    //
    server.use(compression()); // gzip
    server.use(favicon); // utilisation du favicon
    server.use(multer()); // for parsing multipart/form-data
    server.use(bodyParser.json()); // for parsing application/json
    server.use(bodyParser.urlencoded({ // for parsing application/x-www-form-urlencoded
        extended: true
    }));
    //
    // le serveur express sert des ressouces statiques;
    server.use(express.static(www));
    //
    // routers/controllers
    server.use('/project', projectController.router);
    // server.use('/document', documentController.router);
    //
    //
    // init de la bdd
    dbfile = path.join(__dirname, database);
    store.init('project', dbfile, function (err) {
        if (err) {
            console.log(err, dbfile);
        } else {
            // ajout du modele au controlleur
            projectController.model(store);
            projectController.name('project');
            // documentController.model(store);
            // lancement du serveur
            server.listen(http_port, function () {
                console.log('ReadmePad now running under http://localhost:%d', http_port);
            });
        }
    });

}());
