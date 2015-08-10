/*jslint indent: 4, nomen: true */
/*global require, __dirname */
(function () {

    'use strict';

    var // variables
        server, paths,
        port = 9080,
        // requires
        path = require('path'),
        multer = require('multer'),
        express = require('express'),
        bodyParser = require('body-parser'),
        compression = require('compression'),
        serveFavicon = require('serve-favicon'),
        Facade = require('./server/facade');

    paths = {
        www: path.join(__dirname, 'public'),
        app: path.join(__dirname, 'server'),
        storage: path.join(__dirname, 'data')
    };
    //
    //
    // Store = require('./models/project'),
    // ProjectController = require('./controllers/project');
    // documentController = require('./controllers/document')
    //
    // app paths
    // express
    server = express();
    // express middlewares
    //
    server.use(compression()); // gzip
    server.use(serveFavicon(path.join(paths.www, 'favicon.ico'))); // utilisation du favicon
    server.use(multer()); // for parsing multipart/form-data
    server.use(bodyParser.json()); // for parsing application/json
    server.use(bodyParser.urlencoded({ // for parsing application/x-www-form-urlencoded
        extended: true
    }));
    //
    //
    server.use('/docs', express.static(path.join(paths.www, '..', 'docs')));
    //
    // le serveur express sert des ressouces statiques
    // pour l'app AngularJS/Front
    server.use('/', express.static(paths.www));

    Facade.server(server);
    Facade.start().then(function () {
        server.listen(port, function () {
            console.log('ReadmePad now running under http://localhost:%d', port);
        });
    }, function () {});

}());
