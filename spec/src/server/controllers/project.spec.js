/*jshint unused: false */
/*jslint indent: 4, nomen: true */
/*global __dirname, jasmine, process, require, define, describe, xdescribe, it, xit, expect, beforeEach, afterEach, afterLast, console */
(function () {

    'use strict';

    var result, app, db,
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
    storeModel.init('project', dbfile, function () {});
    projectController.model(storeModel);
    storeModel.createProject('project', 'toto', 'path/to/toto', []);

    describe('controllers/project', function () {

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
            it('returns a project', function (done) {
                var params = {
                        project_path: 'path/to/toto'
                    };
                request(app)
                    .post('/project/open')
                    .send(params)
                    .expect('Content-Type', /json/)
                    .expect(200, function (err, res) {
                        expect(err).toBe(null);
                        expect(res.body.pages).toEqual([]);
                        expect(res.body.name).toEqual('toto');
                        expect(res.body.path).toEqual('path/to/toto');
                        expect(res.body.project_id).toEqual(md5('path/to/toto'));
                        done();
                    });
            });
        });

    });

}());

/*
xdescribe('/project/loadall', function () {
    it('Expect something', function () {});
});

xdescribe('[POST] /project/create', function () {
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
*/
