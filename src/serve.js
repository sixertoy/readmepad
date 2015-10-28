/*jslint indent: 4, nomen: true */
/*global require, __dirname, process */
(function () {

    'use strict';
    //
    // load env variables
    require('dotenv').load();

    var // variables
        server, paths, app,
        port = process.env.PORT || 9080,
        debug = process.env.DEBUG || false,
        livereload_port = process.env.LIVERELOAD_PORT || false,
        //
        // requires
        include = require('include').root('./server'),
        path = require('path'),
        multer = require('multer'),
        express = require('express'),
        bodyParser = require('body-parser'),
        compression = require('compression'),
        serveFavicon = require('serve-favicon'),
        livereload = require('express-livereload'),
        //
        // main app entry point
        Application = include('app');
    
    //
    // app paths
    paths = {
        www: path.join(__dirname, 'public'),
        app: path.join(__dirname, 'server'), // include.root()
        storage: path.join(__dirname, 'data')
    };
    //
    // express
    server = express();
    //
    // livereload
    if (debug) {
        livereload(server, {
            watchDir: paths.www,
            port: livereload_port,
            exclusions: ['git/', '.svn/'],
            exts: ['html', 'css', 'js', 'png', 'gif', 'jpg', 'svg']
        });
    }
    //
    // express middlewares
    server.use(compression()); // gzip
    //server.use(serveFavicon(path.join(paths.www, 'favicon.ico'))); // utilisation du favicon
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
    app = new Application(server);
    app.init(function (err) {
        if (err) {

        } else {
            /*
            server.listen(port, function () {
                if (devmode) {
                    console.log('ReadmePad now running under http://localhost:%d', port);
                }
                if (devmode && livereload_port) {
                    console.log('Livereload is running on port %d\n', livereload_port);
                }
            });
            */
        }
    });

}());
