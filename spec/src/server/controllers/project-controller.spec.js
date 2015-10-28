/*jshint unused: false */
/*jslint indent: 4, nomen: true */
/*global __dirname, jasmine, process, require, define, describe, xdescribe, it, xit, expect, beforeEach, afterEach, afterLast, console */
(function () {

    'use strict';

    function stubArguments() {
        return arguments;
    }

    var helper, model, ctrl, app, server,
        cwd = process.cwd(),
        // requires
        sinon = require('sinon'),
        express = require('express'),
        expect = require('chai').expect,
        bodyParser = require('body-parser'),
        /*
        Q = require('q'),
        md5 = require('md5'),
        path = require('path'),
        nedb = require('nedb'),
        multer = require('multer'),
        winston = require('winston'),
        request = require('supertest'),
        filenamify = require('filenamify'),
        scandir = require('scandir-async').exec,
        */
        include = require('include'),
        // includes
        // dbfile = path.join(cwd, 'spec/fixtures/nedb/project.nedb'),
        //validate = include(''),
        //ProjectModel = include(''),
        Application = include('app'),
        ProjectController = include('controllers/project-controller');

    describe('ProjectController Constructor', function () {
        it('throws', function () {
            expect(function () {
                ctrl = new ProjectController();
            }).to.throw();
            expect(function () {
                ctrl = new ProjectController(1234);
            }).to.throw();
            expect(function () {
                ctrl = new ProjectController(app);
            }).to.throw();
        });
        it('not throws', function () {
            expect(function () {
                server = express();
                server.use(bodyParser.json());
                server.use(bodyParser.urlencoded({
                    extended: true
                }));
                app = new Application(server);
                app.init(function () {});
                ctrl = new ProjectController(app, 'project2');
            }).to.not.throw();
        });
    });
    describe('ProjectController Methods', function () {
        beforeEach(function () {
            server = express();
            server.use(bodyParser.json());
            server.use(bodyParser.urlencoded({
                extended: true
            }));
            app = new Application(server);
            app.init(function () {});
        });
        it('has setted router in constructor', function () {
            ctrl = app.getController('project');
            expect(ctrl.getRouter().prototype.toString()).to.equal(express.Router().prototype.toString());
        });
        it('spy calls router methods', function () {
            ctrl = new ProjectController(app, 'project2');
            var router = ctrl.getRouter(),
                spyGet = sinon.spy(router, 'get'),
                spyPut = sinon.spy(router, 'put'),
                spyPost = sinon.spy(router, 'post'),
                spyDelete = sinon.spy(router, 'delete');
            ctrl.init();
            expect(spyPut.calledOnce).to.be.true; // called on /update
            expect(spyPost.calledOnce).to.be.true; // called on /create
            expect(spyGet.calledTwice).to.be.true; // called on /open and /collection
            expect(spyDelete.calledOnce).to.be.true; // called on /remove
        });

    });

}());
