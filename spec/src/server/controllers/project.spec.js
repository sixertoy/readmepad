/*jshint unused: false */
/*jslint indent: 4, nomen: true */
/*global __dirname, jasmine, process, require, define, describe, xdescribe, it, xit, expect, beforeEach, afterEach, afterLast, console */
(function () {

    'use strict';

    var result, app, db,
        dbname = 'project',
        cwd = process.cwd(),
        //
        Q = require('q'),
        md5 = require('md5'),
        path = require('path'),
        nedb = require('nedb'),
        sinon = require('sinon'),
        multer = require('multer'),
        express = require('express'),
        request = require('supertest'),
        bodyParser = require('body-parser'),
        scandir = require('scandir-async').exec,
        dbfile = path.join(cwd, 'spec', 'fixtures', 'nedb', 'project.nedb'),
        storeModel = require(path.join(cwd, 'src', 'server', 'models', 'store')),
        projectUtils = require(path.join(cwd, 'src', 'server', 'helpers', 'project-utils')),
        projectController = require(path.join(cwd, 'src', 'server', 'controllers', 'project'));
    //
    app = express();
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({
        extended: true
    }));
    app.use('/project', projectController.router);
    storeModel.init(dbname, dbfile, function () {});
    //
    projectController.name(dbname);
    projectController.model(storeModel);
    storeModel.createProject(dbname, 'toto', 'path/to/toto', []);

    describe('controllers/project', function () {

        describe('[GET] /project/open', function () {
            it('fail no project_path param', function (done) {
                request(app)
                    .get('/project/open')
                    .send()
                    .expect('Content-Type', /json/)
                    .end(function (err, res) {
                        expect(res.statusCode).toEqual(400);
                        expect(res.error.status).toEqual(400);
                        expect(res.text).toEqual('invalid arguments');
                        expect(res.error.text).toEqual('invalid arguments');
                        done();
                    });
            });
            it('fail empty project_path param', function (done) {
                var params = {
                    project_path: ''
                };
                request(app)
                    .get('/project/open')
                    .send(params)
                    .expect('Content-Type', /json/)
                    .expect(400)
                    .end(function (err, res) {
                        expect(res.statusCode).toEqual(400);
                        expect(res.error.status).toEqual(400);
                        expect(res.text).toEqual('invalid arguments');
                        expect(res.error.text).toEqual('invalid arguments');
                        done();
                    });
            });
            it('fails untrimmed empty project_path param', function (done) {
                var params = {
                    project_path: '   '
                };
                request(app)
                    .get('/project/open')
                    .send(params)
                    .expect('Content-Type', /json/)
                    .end(function (err, res) {
                        expect(res.statusCode).toEqual(400);
                        expect(res.error.status).toEqual(400);
                        expect(res.text).toEqual('invalid arguments');
                        expect(res.error.text).toEqual('invalid arguments');
                        done();
                    });
            });
            it('fail object project_path param', function (done) {
                var params = {
                    project_path: {}
                };
                request(app)
                    .get('/project/open')
                    .send(params)
                    .expect('Content-Type', /json/)
                    .end(function (err, res) {
                        expect(res.statusCode).toEqual(400);
                        expect(res.error.status).toEqual(400);
                        expect(res.text).toEqual('invalid arguments');
                        expect(res.error.text).toEqual('invalid arguments');
                        done();
                    });
            });
            it('fail project not exists', function (done) {
                var params = {
                    project_path: 'path/to/non/exists'
                };
                request(app)
                    .get('/project/open')
                    .send(params)
                    .expect('Content-Type', /json/)
                    .end(function (err, res) {
                        expect(res.statusCode).toEqual(404);
                        expect(res.error.status).toEqual(404);
                        expect(res.text).toEqual('unable to find project');
                        expect(res.error.text).toEqual('unable to find project');
                        done();
                    });
            });
        });

        describe('[DELETE] /project/delete', function () {
            it('fails', function (done) {
                var params = {
                    project_path: 'path/to/toto'
                };
                request(app)
                    .post('/project/delete')
                    .send()
                    .end(function (err, res) {
                        expect(res.statusCode).toEqual(404);
                        done();
                    });
            });
            it('returns status code 400', function (done) {
                var params = {
                    project_path: ''
                };
                request(app)
                    .delete('/project/delete')
                    .send(params)
                    .expect('Content-Type', /json/)
                    .end(function (err, res) {
                        expect(res.statusCode).toEqual(400);
                        expect(res.text).toEqual('invalid arguments');
                        done();
                    });
            });
            it('returns status code 200', function (done) {
                var params = {
                    project_path: 'path/to/toto'
                };
                request(app)
                    .delete('/project/delete')
                    .send(params)
                    .expect('Content-Type', /json/)
                    .end(function (err, res) {
                        expect(res.statusCode).toEqual(200);
                        done();
                    });
            });
            it('returns status code 204', function (done) {
                var params = {
                    project_path: 'path/to/toto'
                };
                request(app)
                    .delete('/project/delete')
                    .send(params)
                    .expect('Content-Type', /json/)
                    .end(function (err, res) {
                        expect(res.statusCode).toEqual(204);
                        done();
                    });
            });
        });

        describe('[POST] /project/create', function () {
            it('fails', function (done) {
                request(app)
                    .get('/project/create')
                    .send()
                    .end(function (err, res) {
                        expect(res.statusCode).toEqual(404);
                        done();
                    });
            });
            it('fails', function (done) {
                request(app)
                    .put('/project/create')
                    .send()
                    .end(function (err, res) {
                        expect(res.statusCode).toEqual(404);
                        done();
                    });
            });
            it('fails no project_path param', function (done) {
                request(app)
                    .post('/project/create')
                    .send()
                    .expect('Content-Type', /json/)
                    .end(function (err, res) {
                        expect(res.statusCode).toEqual(400);
                        expect(res.text).toEqual('invalid arguments');
                        done();
                    });
            });
            it('fails empty project_path param', function (done) {
                var params = {
                    project_path: ''
                };
                request(app)
                    .post('/project/create')
                    .send(params)
                    .expect('Content-Type', /json/)
                    .end(function (err, res) {
                        expect(res.statusCode).toEqual(400);
                        expect(res.text).toEqual('invalid arguments');
                        done();
                    });
            });
            it('fails project not exists', function (done) {
                var params = {
                    project_path: path.join(__dirname, 'src', 'docs')
                };
                request(app)
                    .post('/project/create')
                    .send(params)
                    .expect('Content-Type', /json/)
                    .end(function (err, res) {
                        expect(res.statusCode).toEqual(403);
                        expect(res.text.indexOf('ENOENT') !== -1).toEqual(true);
                        done();
                    });
            });
            it('success project created', function (done) {
                var fullpath = path.join(cwd, 'src', 'docs'),
                    params = {
                        project_path: fullpath
                    },
                    doc = {
                        name: "docs",
                        path: "d:\\npm\\readmepad\\src\\docs",
                        project_id: "0c7b9011b213e91025335a16f70b1a1a"
                    };
                request(app)
                    .post('/project/create')
                    .send(params)
                    .expect('Content-Type', /json/)
                    .end(function (err, res) {
                        expect(res.statusCode).toEqual(201);
                        result = JSON.parse(res.text);
                        expect(result.name).toEqual(doc.name);
                        expect(result.path).toEqual(doc.path);
                        expect(result.project_id).toEqual(doc.project_id);
                        done();
                    });
            });
            it('success but project already exists', function (done) {
                var fullpath = path.join(cwd, 'src', 'docs'),
                    params = {
                        project_path: fullpath
                    },
                    doc = {
                        name: "docs",
                        path: "d:\\npm\\readmepad\\src\\docs",
                        project_id: "0c7b9011b213e91025335a16f70b1a1a"
                    };
                request(app)
                    .post('/project/create')
                    .send(params)
                    .expect('Content-Type', /json/)
                    .end(function (err, res) {
                        expect(res.statusCode).toEqual(200);
                        result = JSON.parse(res.text);
                        expect(result.name).toEqual(doc.name);
                        expect(result.path).toEqual(doc.path);
                        expect(result.project_id).toEqual(doc.project_id);
                        done();
                    });
            });
        });

        describe('[GET] /project/loadall', function () {
            it('fails', function (done) {
                request(app)
                    .post('/project/loadall')
                    .send()
                    .end(function (err, res) {
                        expect(res.statusCode).toEqual(404);
                        done();
                    });
            });
            it('success', function (done) {
                var doc = {
                    name: "docs",
                    path: "d:\\npm\\readmepad\\src\\docs",
                    project_id: "0c7b9011b213e91025335a16f70b1a1a"
                };
                request(app)
                    .get('/project/loadall')
                    .send()
                    .expect('Content-Type', /json/)
                    .end(function (err, res) {
                        expect(res.statusCode).toEqual(200);
                        result = JSON.parse(res.text);
                        expect(result.length).toEqual(1);
                        expect(result[0].name).toEqual(doc.name);
                        expect(result[0].path).toEqual(doc.path);
                        expect(result[0].project_id).toEqual(doc.project_id);
                        done();
                    });
            });
        });

        describe('[GET] /project/open', function () {
            it('fails', function (done) {
                request(app)
                    .post('/project/delete')
                    .send()
                    .end(function (err, res) {
                        expect(res.statusCode).toEqual(404);
                        done();
                    });
            });
            it('returns a files tree', function (done) {
                var params = {
                    project_path: path.join(cwd, 'src', 'docs')
                };
                scandir(params.project_path).then(function (data) {
                    request(app)
                        .get('/project/open')
                        .send(params)
                        .expect('Content-Type', /json/)
                        .end(function (err, res) {
                            expect(res.statusCode).toEqual(200);
                            result = JSON.parse(res.text);
                            expect(data).toEqual(result);
                            done();
                        });
                }, function () {});
            });
        });

    });

}());
