/*jshint unused: false */
/*jslint indent: 4 */
/*global jasmine, process, require, define, describe, xdescribe, it, xit, expect, beforeEach, afterEach, afterLast, console */
(function () {

    'use strict';

    var result, app, db,
        cwd = process.cwd(),
        //
        path = require('path'),
        nedb = require('nedb'),
        multer = require('multer'),
        express = require('express'),
        request = require('supertest'),
        bodyParser = require('body-parser'),
        projectController = require(path.join(cwd, 'src', 'server', 'controllers', 'project'));

    db = new nedb({
        autoload: true,
        filename: path.join(__dirname, '..', '..', '..', 'fixtures', 'project.nedb')
    });
    db.loadDatabase(function (err) {
        db.ensureIndex({
            unique: true,
            fieldName: 'project_name'
        });
    });

    app = express();
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({
        extended: true
    }));
    app.use('/project', projectController.router);
    projectController.options({
        db: db
    });

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
            it('fails empty project_path param', function (done) {
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
        });

    });
}());
