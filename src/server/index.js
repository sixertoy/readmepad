/*jslint indent: 4, nomen: true */
/*global require, process, console */
(function () {

    'use strict';

    var app, tree, root, front,
        HTTP_PORT = 9080,
        // requires
        FS = require('fs'),
        Path = require('path'),
        multer = require('multer'),
        Express = require('express'),
        BodyParser = require('body-parser'),
        Explorer = require('./lib/explorer');

    root = Path.join(__dirname, 'www', 'docs');
    front = Path.join(__dirname, '..', 'public', 'html');

    app = new Express();

    //
    // Middlewares
    app.use(multer()); // for parsing multipart/form-data
    app.use(BodyParser.json()); // for parsing application/json
    app.use(BodyParser.urlencoded({
        extended: true
    })); // for parsing application/x-www-form-urlencoded
    app.use(Express.static(front));

    app.post('/save', function (req, res) {
        var options = {
            encoding: 'utf8'
        };
        //
        // content du save
        console.log(req.body.content);
        res.send('yo');
    });

    app.post('/view', function (req, res) {
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

    app.get('/explorer', function (req, res) {
        res.send(tree);
    });

    app.listen(HTTP_PORT, function () {
        tree = Explorer.flatten(root);
        console.log('ReadmePad now running under http://localhost:%d', HTTP_PORT);
        console.log('ReadmePad root dir:%s', root);
    });

}());
