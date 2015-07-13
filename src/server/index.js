/*jslint indent: 4, nomen: true */
/*global require, module, process, console */
(function () {

    'use strict';

    var app, tree, root,
        HTTP_PORT = 9080,
        // requires
        FS = require('fs'),
        Path = require('path'),
        Multer = require('multer'),
        Express = require('express'),
        BodyParser = require('body-parser'),
        Explorer = require('./lib/explorer');

    root = Path.join(process.cwd(), 'public', 'docs');

    app = new Express();

    //
    // Middlewares
    app.use(Multer()); // for parsing multipart/form-data
    app.use(BodyParser.json()); // for parsing application/json
    app.use(BodyParser.urlencoded({
        extended: true
    })); // for parsing application/x-www-form-urlencoded
    app.use(Express.static('public/html'));

    app.post('/view', function (req, res) {
        var options = {encoding: 'utf8'},
            file = Path.join(process.cwd(), 'public', 'docs', req.body.path);
        //
        // read file
        FS.readFile(file, options, function(err, data){
            if(err){
                res.status(404).send({ error: err });
            } else {
                res.send(data);
            }
        });
    });

    app.get('/explorer', function (req, res) {
        // console.log(tree);
        // tree = JSON.stringify(tree);
        res.send(tree);
    });

    app.listen(HTTP_PORT, function () {
        tree = Explorer.flatten(root);
        console.log('ReadmePad now running under http://localhost:%d', HTTP_PORT);
        console.log('ReadmePad root dir:%s', root);
    });

}());
