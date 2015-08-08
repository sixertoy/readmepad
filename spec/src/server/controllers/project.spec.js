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
        expect = require('chai').expect,
        filenamify = require('filenamify'),
        bodyParser = require('body-parser'),
        scandir = require('scandir-async').exec,
        dbfile = path.join(cwd, 'spec', 'fixtures', 'nedb', 'project.nedb'),
        storeModel = require(path.join(cwd, 'src', 'server', 'models', 'store')),
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
    storeModel.createProject(dbname, {
        name: 'toto',
        path: 'path/to/toto'
    }, []);

    describe('projectController', function () {

        describe('[GET]/project/open', function () {
            it('fails', function (done) {
                request(app)
                    .post('/project/open')
                    .send()
                    .expect('Content-Type', /json/)
                    .end(function (err, res) {
                        expect(res.status).to.equal(404); // Cannot POST /project/open
                        done();
                    });
            });
            it('fail no project_id param', function (done) {
                request(app)
                    .get('/project/open')
                    .send()
                    .expect('Content-Type', /json/)
                    .end(function (err, res) {
                        expect(res.status).to.equal(404); // Cannot GET /project/open
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
                        expect(res.status).to.equal(204);
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
                        expect(res.status).to.equal(204);
                        done();
                    });
            });
        });

        describe('[DELETE]/project/delete', function () {
            it('fails', function (done) {
                request(app)
                    .post('/project/delete')
                    .send()
                    .end(function (err, res) {
                        expect(res.statusCode).to.equal(404);
                        done();
                    });
            });
            it('fail code 404', function (done) {
                request(app)
                    .delete('/project/delete')
                    .send()
                    .expect('Content-Type', /json/)
                    .end(function (err, res) {
                        expect(res.statusCode).to.equal(404);
                        done();
                    });
            });
            it('success code 200 but no document', function (done) {
                var pid = md5('project/non/exists');
                request(app)
                    .delete('/project/delete/' + pid)
                    .send()
                    .expect('Content-Type', /json/)
                    .end(function (err, res) {
                        expect(res.body).to.equal(false);
                        expect(res.statusCode).to.equal(200);
                        done();
                    });
            });
            it('success code 200 document has been deleted', function (done) {
                var pid = md5('path/to/toto');
                request(app)
                    .delete('/project/delete/' + pid)
                    .send()
                    .expect('Content-Type', /json/)
                    .end(function (err, res) {
                        expect(res.body).to.equal(true);
                        expect(res.statusCode).to.equal(200);
                        done();
                    });
            });
            it('success code 200 but no document', function (done) {
                var pid = md5('path/to/toto');
                request(app)
                    .delete('/project/delete/' + pid)
                    .send()
                    .expect('Content-Type', /json/)
                    .end(function (err, res) {
                        expect(res.body).to.equal(false);
                        expect(res.statusCode).to.equal(200);
                        done();
                    });
            });
        });

        describe('[POST]/project/create', function () {
            it('fails', function (done) {
                request(app)
                    .get('/project/create')
                    .send()
                    .end(function (err, res) {
                        expect(res.statusCode).to.equal(404);
                        done();
                    });
            });
            it('fails', function (done) {
                request(app)
                    .put('/project/create')
                    .send()
                    .end(function (err, res) {
                        expect(res.statusCode).to.equal(404);
                        done();
                    });
            });
            it('fails no project_path param', function (done) {
                request(app)
                    .post('/project/create')
                    .send()
                    .expect('Content-Type', /json/)
                    .end(function (err, res) {
                        expect(res.statusCode).to.equal(400);
                        done();
                    });
            });
            it('fails empty project_path param', function (done) {
                var params = {
                    name: '',
                    path: ''
                };
                request(app)
                    .post('/project/create')
                    .send(params)
                    .expect('Content-Type', /json/)
                    .end(function (err, res) {
                        expect(res.statusCode).to.equal(400);
                        done();
                    });
            });
            it('fails project not exists', function (done) {
                var params = {
                    name: 'an ui project name',
                    path: path.join(__dirname, 'src', 'docs')
                };
                request(app)
                    .post('/project/create')
                    .send(params)
                    .expect('Content-Type', /json/)
                    .end(function (err, res) {
                        expect(res.statusCode).to.equal(403);
                        done();
                    });
            });
            it('success project non exists created', function (done) {
                var name,
                    params = {
                        name: 'AN ui project name',
                        path: path.join(cwd, 'src', 'docs')
                    };
                request(app)
                    .post('/project/create')
                    .send(params)
                    .expect('Content-Type', /json/)
                    .end(function (err, res) {
                        expect(res.statusCode).to.equal(201);

                        expect(res.body.path).to.equal(params.path);
                        expect(res.body.uiname).to.equal(params.name);

                        name = filenamify(params.name);
                        expect(res.body.name).not.to.equal(name);
                        name = filenamify(params.name).replace(/([\s])/g, '_').toLowerCase();
                        expect(res.body.name).to.equal(name);
                        done();
                    });
            });
            it('success but project already exists', function (done) {
                var params = {
                    name: 'AN ui project name',
                    path: path.join(cwd, 'src', 'docs')
                };
                request(app)
                    .post('/project/create')
                    .send(params)
                    .expect('Content-Type', /json/)
                    .end(function (err, res) {
                        expect(res.statusCode).to.equal(200);
                        expect(res.body.path).to.equal(params.path);
                        expect(res.body.uiname).to.equal(params.name);
                        done();
                    });
            });
        });

        describe('[PUT]/project/update', function () {
            it('fails', function (done) {
                var params = {};
                request(app)
                    .post('/project/update')
                    .send(params)
                    .expect('Content-Type', /json/)
                    .end(function (err, res) {
                        expect(res.statusCode).to.equal(404);
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
                        expect(res.statusCode).to.equal(400);
                        done();
                    });
            });
            it('success rename project', function (done) {
                var params = {
                    name: 'ReadmePad',
                    pid: md5(path.join(cwd, 'src', 'docs'))
                };
                request(app)
                    .put('/project/update')
                    .send(params)
                    .expect('Content-Type', /json/)
                    .end(function (err, res) {
                        expect(res.statusCode).to.equal(201);
                        done();
                    });
            });
        });

        describe('[GET]/project/loadall', function () {
            it('fails', function (done) {
                request(app)
                    .post('/project/loadall')
                    .send()
                    .end(function (err, res) {
                        expect(res.statusCode).to.equal(404);
                        done();
                    });
            });
            it('success', function (done) {
                var doc = {
                    name: 'ReadmePad',
                    path: path.join(cwd, 'src', 'docs')
                };
                request(app)
                    .get('/project/loadall')
                    .send()
                    .expect('Content-Type', /json/)
                    .end(function (err, res) {
                        expect(res.statusCode).to.equal(200);
                        expect(res.body.length).to.equal(1);
                        expect(res.body[0].path).to.equal(doc.path);
                        expect(res.body[0].uiname).to.equal(doc.name);
                        expect(res.body[0].name).to.equal(filenamify(doc.name).replace(/([\s])/g, '_').toLowerCase());
                        done();
                    });
            });
        });

        describe('[GET]/project/open', function () {
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
                            expect(res.statusCode).to.equal(200);
                            expect(res.body).to.deep.equal(data);
                            done();
                        });
                }, function () {});
            });
        });

    });

}());
