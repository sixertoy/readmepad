/*jslint indent: 4, nomen: true */
/*global require, __dirname */
(function () {

    'use strict';
    //
    // load env variables
    require('dotenv').load();

    var // variables
        server, paths, devmode,
        port = process.env.PORT || 9080,
        devmode = process.env.DEBUG || false,
        lr_port = process.env.LIVERELOAD_PORT || false,
        //
        // requires
        path = require('path'),
        multer = require('multer'),
        express = require('express'),
        bodyParser = require('body-parser'),
        compression = require('compression'),
        serveFavicon = require('serve-favicon'),
        livereload = require('express-livereload'),
        //
        // main app entry point
        Facade = require('./server/facade');
    //
    // app paths
    paths = {
        www: path.join(__dirname, 'public'),
        app: path.join(__dirname, 'server'),
        storage: path.join(__dirname, 'data')
    };
    //
    // express
    server = express();
    //
    // livereload
    if (devmode) {
        livereload(server, {
            port: lr_port,
            watchDir: paths.www,
            exclusions: ['git/', '.svn/'],
            exts: ['html', 'css', 'js', 'png', 'gif', 'jpg', 'svg']
        });
    }
    //
    // express middlewares
    server.use(compression()); // gzip
    server.use(serveFavicon(path.join(paths.www, 'favicon.ico'))); // utilisation du favicon
    server.use(multer()); // for parsing multipart/form-data
    server.use(bodyParser.json()); // for parsing application/json
    server.use(bodyParser.urlencoded({ // for parsing application/x-www-form-urlencoded
        extended: true
    }));
    //
    // le serveur express sert des ressouces statiques
    // pour l'app AngularJS/Front
    server.use('/', express.static(paths.www));
    //server.use('/docs', express.static(path.join(paths.www, '..', 'docs')));
    //
    Facade.start(server).then(function () {
        server.listen(port, function () {
            console.log('ReadmePad now running under http://localhost:%d', port);
            if (devmode) {
                console.log('Livereload is running on port %d\n', lr_port);
            }
        });
    }, function () {});

}());
