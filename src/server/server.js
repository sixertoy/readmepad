/*jslint indent: 4, nomen: true */
/*global require, process, console, __dirname */
(function () {

    'use strict';

    var // variables
        server, root, app, db,
        // constants
        HTTP_PORT = 9080,
        DATABASE = './db.nedb',
        // requires
        FS = require('fs'),
        md5 = require('md5'),
        Path = require('path'),
        chalk = require('chalk'),
        multer = require('multer'),
        Datastore = require('nedb'),
        Express = require('express'),
        favicon = require('serve-favicon'),
        BodyParser = require('body-parser'),
        Explorer = require('./lib/explorer'),
        //
        // Facade
        Facade = {
            ok: function (res, data) {
                console.log(chalk.green('send data to client'));
                res.send(data);
            },
            send404: function (res, err) {
                // console.log(chalk.red('error'));
                res.status(404).send({
                    error: err
                });
            }
        };
    //
    //
    root = __dirname; // base du serveur
    app = Path.join(__dirname, '..', 'public', 'html'); // base du client
    favicon = favicon(Path.join(app, 'favicon.ico')); // favison du client
    //
    // creation de la BDD
    db = new Datastore({
        autoload: true,
        filename: Path.join(root, DATABASE)
    });
    // creation du serveur
    server = new Express();

    //
    // Middlewares
    server.use(favicon); // utilisation du favicon
    server.use(multer()); // for parsing multipart/form-data
    server.use(BodyParser.json()); // for parsing application/json
    server.use(BodyParser.urlencoded({ // for parsing application/x-www-form-urlencoded
        extended: true
    }));
    server.use(Express.static(app)); // le serveur express sert une page Angular Statique

    /**
     *
     *
     *
     */
    server.get('/explorer', function (req, res) {
        db.find({}, function (err, docs) {
            if (err) {
                // si l'insertion a echouee
                Facade.send404(res, err);
            } else {
                Facade.ok(res, docs);
            }
        });
    });

    /**
     *
     *
     *
     */
    server.post('/create', function (req, res) {
        var project_id, pages,
            path = Path.normalize(req.body.path);
        //
        console.log('on server');
        // lecture du dossier
        FS.stat(path, function (err, stats) {
            if (err) {
                Facade.send404(res, err);
            } else {
                project_id = md5(path);
                //
                // recherche du projet
                // dans la bdd
                db.findOne({
                    project_id: project_id
                }, function (err, doc) {
                    // si erreur lors du chargemnent de la bdd
                    if (err) {
                        Facade.send404(res, err);
                    } else {
                        if (doc !== null) {
                            // si le document existe
                            // on renvoi le document
                            Facade.ok(res, doc);
                        } else {
                            // si le document n'existe pas
                            // on recupere son arbre
                            pages = Explorer.flatten(path);
                            // on insere le nouveau document
                            // en bdd
                            db.insert({
                                path: path,
                                pages: pages,
                                project_id: project_id,
                                name: Path.basename(path)
                            }, function (err, newDoc) {
                                if (err) {
                                    // si l'insertion a echouee
                                    Facade.send404(res, err);
                                } else {
                                    // si l'insertion a reussie
                                    Facade.ok(res, newDoc);
                                }
                            });
                        }
                    }
                });
                //
            }
        });

    });

    /**
     *
     *
     *
     */
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
        /*
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
        */
    });

    /**
     *
     *
     *
     */
    db.loadDatabase(function (err) {
        if (err) {
            console.log('ReadmePad is unable to load database: %s', DATABASE);
        } else {
            db.ensureIndex({
                unique: true,
                fieldName: 'project_name'
            }, function (err) {
                if (err) {
                    console.log('ReadmePad is unable to create index on: %s datbase', DATABASE);
                } else {
                    server.listen(HTTP_PORT, function () {
                        console.log('ReadmePad now running under http://localhost:%d', HTTP_PORT);
                        console.log('ReadmePad root dir:%s', root);
                    });
                }
            });
        }

    });

}());
