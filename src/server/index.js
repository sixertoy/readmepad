/*jslint indent: 4, nomen: true */
/*global require, process, console, __dirname */
(function () {

    'use strict';

    var server, tree, root, app,
        HTTP_PORT = 9080,
        // requires
        FS = require('fs'),
        Path = require('path'),
        multer = require('multer'),
        Express = require('express'),
        favicon = require('serve-favicon'),
        BodyParser = require('body-parser'),
        Explorer = require('./lib/explorer');

    root = Path.join(__dirname, 'www', 'docs');
    app = Path.join(__dirname, '..', 'public', 'html');
    favicon = favicon(Path.join(app, 'favicon.ico'));

    server = new Express();

    //
    // Middlewares
    server.use(favicon);
    server.use(multer()); // for parsing multipart/form-data
    server.use(BodyParser.json()); // for parsing application/json
    server.use(BodyParser.urlencoded({
        extended: true
    })); // for parsing application/x-www-form-urlencoded
    server.use(Express.static(app));

    server.post('/save', function (req, res) {
        var options = {
            encoding: 'utf8'
        };
        //
        // content du save
        console.log(req.body.content);
        res.send('yo');
    });

    server.post('/view', function (req, res) {
        var options = {
                encoding: 'utf8'
            },
            file = Path.join(root, req.body.path);
        //
        // read file
        FS.readFile(file, options, function (err, data) {
            if (err) {
                res.status(404).send({
                    error: err
                });
            } else {
                res.send(data);
            }
        });
    });

    server.get('/explorer', function (req, res) {
        res.send(tree);
    });

    server.listen(HTTP_PORT, function () {
        tree = Explorer.flatten(root);
        console.log('ReadmePad now running under http://localhost:%d', HTTP_PORT);
        console.log('ReadmePad root dir:%s', root);
    });

}());
