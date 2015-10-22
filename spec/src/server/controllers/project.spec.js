/*jshint unused: false */
/*jslint indent: 4, nomen: true */
/*global __dirname, jasmine, process, require, define, describe, xdescribe, it, xit, expect, beforeEach, afterEach, afterLast, console */
(function () {

    'use strict';

    function stubArguments() {
        return arguments;
    }

    var helper, model, app,
        cwd = process.cwd(),
        //
        Q = require('q'),
        md5 = require('md5'),
        path = require('path'),
        nedb = require('nedb'),
        sinon = require('sinon'),
        multer = require('multer'),
        winston = require('winston'),
        express = require('express'),
        request = require('supertest'),
        expect = require('chai').expect,
        filenamify = require('filenamify'),
        bodyParser = require('body-parser'),
        scandir = require('scandir-async').exec,
        //
        dbfile = path.join(cwd, 'spec/fixtures/nedb/project.nedb'),
        validate = require(path.join(cwd, 'src/server/utils/validate-args')),
        ProjectModel = require(path.join(cwd, 'src/server/models/project')),
        ProjectController = require(path.join(cwd, 'src/server/controllers/project-controller'));

    app = express();
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({
        extended: true
    }));

    winston.level = 'error';

    describe('ProjectController', function () {

        this.timeout(3000);

        it('init project', function (done) {
            model = new ProjectModel();
            model.init(dbfile).then(function (store) {
                helper = ProjectController.getInstance();
                helper.init(model);
                app.use('/project', helper.router());
                done();
            });
        });

        describe('error from model status code 503', function () {
            var params,
                code = 503,
                pid = 'project_id';

            function stubModel(method) {
                sinon.stub(helper.model(), method, function () {
                    var q = Q.defer();
                    q.reject(new Error('error from model'));
                    return q.promise;
                });
            }

            function unstubModel(method) {
                helper.model()[method].restore();
            }
            it('createProject', function (done) {
                stubModel('findOneProject');
                params = {
                    path: cwd,
                    name: 'project name'
                };
                request(app)
                    .post('/project/create')
                    .send(params)
                    .end(function (err, res) {
                        expect(res.statusCode).to.equal(code);
                        unstubModel('findOneProject');
                        done();
                    });
            });
            it('updateProject', function (done) {
                stubModel('updateProject');
                params = {
                    pid: pid,
                    name: 'a new project name'
                };
                request(app)
                    .put('/project/update')
                    .send(params)
                    .end(function (err, res) {
                        expect(res.statusCode).to.equal(code);
                        unstubModel('updateProject');
                        done();
                    });
            });
            it('deleteProject', function (done) {
                stubModel('deleteProject');
                request(app)
                    .delete('/project/delete/' + pid)
                    .send()
                    .end(function (err, res) {
                        expect(res.statusCode).to.equal(code);
                        unstubModel('deleteProject');
                        done();
                    });
            });
            it('findOneProject', function (done) {
                stubModel('findOneProject');
                request(app)
                    .get('/project/open/' + pid)
                    .send()
                    .end(function (err, res) {
                        expect(res.statusCode).to.equal(code);
                        unstubModel('findOneProject');
                        done();
                    });
            });
            it('findAll', function (done) {
                stubModel('findAll');
                request(app)
                    .get('/project/collection')
                    .send()
                    .end(function (err, res) {
                        expect(res.statusCode).to.equal(code);
                        unstubModel('findAll');
                        done();
                    });
            });
        });

        describe('[GET]/project/collection', function () {
            it('returns 200 no project in DB', function (done) {
                request(app)
                    .get('/project/collection')
                    .send()
                    .end(function (err, res) {
                        expect(res.body).to.equal(false);
                        expect(res.statusCode).to.equal(200);
                        done();
                    });
            });
        });


        describe('[GET]/project/open', function () {
            var pid;
            it('fails no pid param', function (done) {
                request(app)
                    .get('/project/open')
                    .send()
                    .expect('Content-Type', /json/)
                    .end(function (err, res) {
                        expect(res.status).to.equal(404); // Cannot GET /project/open
                        done();
                    });
            });
            it('fails empty pid code 404', function (done) {
                pid = '   ';
                request(app)
                    .get('/project/open/' + pid)
                    .send()
                    .expect('Content-Type', /json/)
                    .end(function (err, res) {
                        expect(res.status).to.equal(404);
                        done();
                    });
            });
            it('fails invalid pid code 204', function (done) {
                pid = JSON.stringify({
                    prop: 'value'
                });
                request(app)
                    .get('/project/open/' + pid)
                    .send()
                    .expect('Content-Type', /json/)
                    .end(function (err, res) {
                        expect(res.status).to.equal(204);
                        done();
                    });
            });
            it('fails invalid pid code 204', function (done) {
                pid = false;
                request(app)
                    .get('/project/open/' + pid)
                    .send()
                    .expect('Content-Type', /json/)
                    .end(function (err, res) {
                        expect(res.status).to.equal(204);
                        done();
                    });
            });
            it('fails no project code 204', function (done) {
                pid = md5('path/to/non/exists');
                request(app)
                    .get('/project/open/' + pid)
                    .send()
                    .expect('Content-Type', /json/)
                    .end(function (err, res) {
                        expect(res.status).to.equal(204);
                        done();
                    });
            });
            it('fails project exists in db but path non exists code 503', function (done) {
                var p = 'path/to/non/exists';
                pid = md5(p);
                sinon.stub(helper.model(), 'findOneProject', function () {
                    var q = Q.defer();
                    q.resolve({
                        path: p
                    });
                    return q.promise;
                });
                request(app)
                    .get('/project/open/' + pid)
                    .send()
                    .expect('Content-Type', /json/)
                    .end(function (err, res) {
                        expect(res.status).to.equal(503);
                        helper.model().findOneProject.restore();
                        done();
                    });
            });
        });

        describe('[DELETE]/project/delete', function () {
            var pid;
            it('fails no pid param code 404', function (done) {
                request(app)
                    .delete('/project/delete')
                    .send()
                    .expect('Content-Type', /json/)
                    .end(function (err, res) {
                        expect(res.status).to.equal(404);
                        done();
                    });
            });
            it('fails empty pid code 404', function (done) {
                pid = '   ';
                request(app)
                    .delete('/project/delete/' + pid)
                    .send()
                    .expect('Content-Type', /json/)
                    .end(function (err, res) {
                        expect(res.status).to.equal(404);
                        done();
                    });
            });
            it('fails invalid pid code 200 but respond', function (done) {
                pid = JSON.stringify({
                    prop: 'value'
                });
                request(app)
                    .delete('/project/delete/' + pid)
                    .send()
                    .expect('Content-Type', /json/)
                    .end(function (err, res) {
                        expect(res.body).to.equal(false);
                        expect(res.status).to.equal(200);
                        done();
                    });
            });
            it('fails invalid pid code 200 but respond', function (done) {
                pid = false;
                request(app)
                    .delete('/project/delete/' + pid)
                    .send()
                    .expect('Content-Type', /json/)
                    .end(function (err, res) {
                        expect(res.body).to.equal(false);
                        expect(res.status).to.equal(200);
                        done();
                    });
            });
            it('fails no project in db with pid code 200', function (done) {
                pid = md5('path/to/non/exists');
                request(app)
                    .delete('/project/delete/' + pid)
                    .send()
                    .expect('Content-Type', /json/)
                    .end(function (err, res) {
                        expect(res.body).to.equal(false);
                        expect(res.status).to.equal(200);
                        done();
                    });
            });
        });

        describe('[PUT]/project/update', function () {
            var project;
            it('fails null project data code 404', function(){
                request(app)
                    .put('/project/update')
                    .send(project)
                    .expect('Content-Type', /json/)
                    .end(function (err, res) {
                        expect(res.status).to.equal(404);
                        done();
                    });
            });
            it('fails empty project data code 400', function(){
                project = {};
                request(app)
                    .put('/project/update')
                    .send(project)
                    .expect('Content-Type', /json/)
                    .end(function (err, res) {
                        expect(res.status).to.equal(400);
                        done();
                    });
            });
            it('fails empty props project data code 400', function(){
                project = {
                    pid: '',
                    name: false
                };
                request(app)
                    .put('/project/update')
                    .send(project)
                    .expect('Content-Type', /json/)
                    .end(function (err, res) {
                        expect(res.status).to.equal(400);
                        done();
                    });
            });
            it('fails empty props project data code 400', function(){
                project = {
                    pid: 'not an empty string',
                    name: false
                };
                request(app)
                    .put('/project/update')
                    .send(project)
                    .expect('Content-Type', /json/)
                    .end(function (err, res) {
                        expect(res.status).to.equal(400);
                        done();
                    });
            });
            it('fails invalid project data code 400', function(){
                project = false;
                request(app)
                    .put('/project/update')
                    .send(project)
                    .expect('Content-Type', /json/)
                    .end(function (err, res) {
                        expect(res.status).to.equal(400);
                        done();
                    });
            });

        });

        describe('[POST]/project/create', function () {
            var project;
            xit('fails invalid project data code 400', function(){
                project = false;
                request(app)
                    .post('/project/create')
                    .send(project)
                    .expect('Content-Type', /json/)
                    .end(function (err, res) {
                        expect(res.status).to.equal(400);
                        done();
                    });
            });
        });

    });

    /*
    describe('projectController', function () {

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

        describe('[GET]/project/collection', function () {
            it('fails', function (done) {
                request(app)
                    .post('/project/collection')
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
                    .get('/project/collection')
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
    */

}());
