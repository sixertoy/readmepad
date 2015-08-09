/*jslint indent: 4, nomen: true */
/*global require, __dirname */
(function () {

    'use strict';

    var // variables
        server, favicon, www, app, conf, storage,
        port = 9080,
        // requires
        path = require('path'),
        multer = require('multer'),
        express = require('express'),
        bodyParser = require('body-parser'),
        compression = require('compression'),
        serveFavicon = require('serve-favicon'),
        Facade = require('./server/facade');
    //
    //
    // Store = require('./models/project'),
    // ProjectController = require('./controllers/project');
    // documentController = require('./controllers/document')
    //
    // app paths
    www = path.join(__dirname, 'public');
    app = path.join(__dirname, 'server');
    storage = path.join(__dirname, 'data');
    favicon = path.join(www, 'favicon.ico');
    // express
    server = express();
    // express middlewares
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

    Facade.server(server);
    Facade.start().then(function () {
        server.listen(port, function () {
            console.log('ReadmePad now running under http://localhost:%d', port);
        });
    }, function () {});

}());
