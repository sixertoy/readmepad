/*jshint unused: false */
/*jslint indent: 4, nomen: true */
/*global __dirname, jasmine, process, require, define, describe, xdescribe, it, xit, expect, beforeEach, afterEach, afterLast, console */
(function () {

    'use strict';

    var result, app, db,
        cwd = process.cwd(),
        //
        Q = require('q'),
        path = require('path'),
        nedb = require('nedb'),
        sinon = require('sinon'),
        multer = require('multer'),
        express = require('express'),
        request = require('supertest'),
        bodyParser = require('body-parser'),
        storeModel = require(path.join(cwd, 'src', 'server', 'models', 'store')),
        projectController = require(path.join(cwd, 'src', 'server', 'controllers', 'project'));
    //
    app = express();
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({
        extended: true
    }));
    app.use('/project', projectController.router);
    storeModel.init(path.join(__dirname, '..', '..', '..', 'fixtures', 'db.nedb'));
    projectController.model(storeModel);

    describe('ProjectController', function () {

        xdescribe('/project/loadall', function () {
            it('Expect something', function () {});
        });

        describe('[POST] /project/open', function () {
            it('fails no project_path param', function (done) {
                request(app)
                    .post('/project/open')
                    .send()
                    .expect('Content-Type', /json/)
                    .expect(200, function (err, body) {
                        expect(err).not.toBe(null);
                        done();
                    });
            });
            it('fails empty project_path param', function (done) {
                var params = {
                    project_path: ''
                };
                request(app)
                    .post('/project/open')
                    .send(params)
                    .expect('Content-Type', /json/)
                    .expect(200, function (err, body) {
                        expect(err).not.toBe(null);
                        done();
                    });
            });
            it('not fails', function (done) {
                var doc = {
                        name: '',
                        items: [],
                        fullpath: ''
                    },
                    params = {
                        project_path: './spec/fixtures/unittests'
                    };
                request(app)
                    .post('/project/open')
                    .send(params)
                    .expect('Content-Type', /json/)
                    .expect(200, function (err, body) {
                        expect(err).toBe(null);
                        done();
                    });
            });
        });

        describe('[POST] /project/create', function () {
            it('fails no project_path param', function (done) {
                request(app)
                    .post('/project/create')
                    .send()
                    .expect('Content-Type', /json/)
                    .expect(200, function (err, body) {
                        expect(err).not.toBe(null);
                        done();
                    });
            });
            it('fails no project_path param', function (done) {
                var params = {
                    project_path: ''
                };
                request(app)
                    .post('/project/create')
                    .send(params)
                    .expect('Content-Type', /json/)
                    .expect(200, function (err, body) {
                        expect(err).not.toBe(null);
                        done();
                    });
            });
            xit('return new document', function (done) {
                var params = {
                    project_path: path.join(__dirname, '..', '..', '..', '..', 'src', 'docs')
                };
                request(app)
                    .post('/project/create')
                    .send(params)
                    .expect('Content-Type', /json/)
                    .expect(200, function (err, body) {
                        expect(err).toBe(null);
                        done();
                    });
            });
        });

    });
}());
