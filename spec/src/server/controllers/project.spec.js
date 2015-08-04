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
            it('fails', function (done) {
                request(app)
                    .post('/project/open')
                    .send()
                    .expect('Content-Type', /json/)
                    .end(function (err, res) {
                        expect(res.status).toEqual(404); // Cannot POST /project/open
                        done();
                    });
            });
            it('fail no project_id param', function (done) {
                request(app)
                    .get('/project/open')
                    .send()
                    .expect('Content-Type', /json/)
                    .end(function (err, res) {
                        expect(res.status).toEqual(404); // Cannot GET /project/open
                        done();
                    });
            });
            it('fail code 404', function (done) {
                var project_id = md5('   ');
                request(app)
                    .get('/project/open/' + project_id)
                    .send()
                    .expect('Content-Type', /json/)
                    .end(function (err, res) {
                        expect(res.status).toEqual(204);
                        done();
                    });
            });
            it('fail code 404', function (done) {
                var project_id = md5('path/to/non/exists');
                request(app)
                    .get('/project/open/' + project_id)
                    .send()
                    .expect('Content-Type', /json/)
                    .end(function (err, res) {
                        expect(res.status).toEqual(204);
                        done();
                    });
            });
        });

        describe('[DELETE] /project/delete', function () {
            it('fails', function (done) {
                request(app)
                    .post('/project/delete')
                    .send()
                    .end(function (err, res) {
                        expect(res.statusCode).toEqual(404);
                        done();
                    });
            });
            it('fail code 404', function (done) {
                request(app)
                    .delete('/project/delete')
                    .send()
                    .expect('Content-Type', /json/)
                    .end(function (err, res) {
                        expect(res.statusCode).toEqual(404);
                        done();
                    });
            });
            it('success code 204', function (done) {
                var project_id = md5('project/non/exists');
                request(app)
                    .delete('/project/delete/' + project_id)
                    .send()
                    .expect('Content-Type', /json/)
                    .end(function (err, res) {
                        expect(res.statusCode).toEqual(204);
                        done();
                    });
            });
            it('success code 200', function (done) {
                var project_id = md5('path/to/toto');
                request(app)
                    .delete('/project/delete/' + project_id)
                    .send()
                    .expect('Content-Type', /json/)
                    .end(function (err, res) {
                        expect(res.statusCode).toEqual(200);
                        done();
                    });
            });
            it('success code 204', function (done) {
                var project_id = md5('path/to/toto');
                request(app)
                    .delete('/project/delete/' + project_id)
                    .send()
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
                        done();
                    });
            });
            it('success project created', function (done) {
                var fullpath = path.join(cwd, 'src', 'docs'),
                    params = {
                        project_path: fullpath
                    },
                    doc = {
                        name: 'docs',
                        path: fullpath
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
                        done();
                    });
            });
            it('success but project already exists', function (done) {
                var fullpath = path.join(cwd, 'src', 'docs'),
                    params = {
                        project_path: fullpath
                    },
                    doc = {
                        name: 'docs',
                        path: fullpath
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
                        done();
                    });
            });
        });

        describe('[PUT] /project/update', function () {
            it('fails', function (done) {
                var params = {};
                request(app)
                    .post('/project/update')
                    .send(params)
                    .expect('Content-Type', /json/)
                    .end(function (err, res) {
                        expect(res.statusCode).toEqual(404);
                        done();
                    });
            });
            it('fail no project in params', function (done) {
                var params = {};
                request(app)
                    .put('/project/update')
                    .send(params)
                    .expect('Content-Type', /json/)
                    .end(function (err, res) {
                        expect(res.statusCode).toEqual(400);
                        done();
                    });
            });
            it('success rename project', function (done) {
                var fullpath = path.join(cwd, 'src', 'docs'),
                    params = {
                        project: {
                            name: 'ReadmePad',
                            project_id: md5(fullpath)
                        }
                    };
                request(app)
                    .put('/project/update')
                    .send(params)
                    .expect('Content-Type', /json/)
                    .end(function (err, res) {
                        expect(res.statusCode).toEqual(201);
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
                var p,
                    doc = {
                        name: 'ReadmePad',
                        path: path.join(cwd, 'src', 'docs')
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
                        done();
                    });
            });
        });

        describe('[GET] /project/open', function () {
            it('returns a files tree', function (done) {
                var project_id,
                    project_path = path.join(cwd, 'src', 'docs');
                scandir(project_path, {
                    sorted: true
                }).then(function (data) {
                    project_id = md5(project_path);
                    request(app)
                        .get('/project/open/' + project_id)
                        .send()
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
