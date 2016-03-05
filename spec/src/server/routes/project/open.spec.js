/*jshint unused: false */
/*jslint indent: 4, nomen: true */
/*global __dirname, process, require, define, describe, xdescribe, it, xit, expect, beforeEach, afterEach, afterLast, console */
(function () {

    'use strict';

    var result, app, server, ctrl,
        callback = function () {
            console.log('callback called');
        },
        pid = -1,
        cwd = process.cwd(),
        path = require('path'),
        include = require('include'),
        express = require('express'),
        request = require('supertest'),
        expect = require('chai').expect,
        bodyParser = require('body-parser'),
        // includes
        Facade = include('facade'),
        Application = include('app');

    beforeEach(function () {
        server = express();
        server.use(bodyParser.json());
        server.use(bodyParser.urlencoded({
            extended: true
        }));
        Facade.setApplication(new Application(server));
        app = Facade.getApplication();
        app.init(function () {});
    });

    describe('Route[GET][/project/open]', function () {
        it('fails invalid pid code 204', function (done) {
            pid = JSON.stringify({
                prop: 'value'
            });
            request(server)
                .get('/project/open/' + pid)
                .send()
                .expect('Content-Type', /json/)
                .end(function (err, res) {
                    expect(res.status).to.equal(204); // Cannot GET /project/open
                    done();
                });
        });
        it.skip('fails no pid param', function (done) {
            request(server)
                .get('/project/open')
                .send()
                .expect('Content-Type', /json/)
                .end(function (err, res) {
                    expect(res.status).to.equal(404); // Cannot GET /project/open
                    done();
                });
        });
        it.skip('fails empty pid code 404', function (done) {
            pid = '   ';
            request(server)
                .get('/project/open/' + pid)
                .send()
                .expect('Content-Type', /json/)
                .end(function (err, res) {
                    expect(res.status).to.equal(404);
                    done();
                });
        });
        /*
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
        */

    });

}());
