/*jshint unused: false */
/*jslint indent: 4, nomen: true */
/*global __dirname, jasmine, process, require, define, describe, xdescribe, it, xit, expect, beforeEach, afterEach, afterLast, console */
(function () {

    'use strict';

    function stubArguments() {
        return arguments;
    }

    var helper, model, app, ctrl,
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
        include = require('include').root('./src/server'),
        // includes
        // dbfile = path.join(cwd, 'spec/fixtures/nedb/project.nedb'),
        //validate = include(''),
        //ProjectModel = include(''),
        ProjectController = include('controllers/project-controller');

    app = express();
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({
        extended: true
    }));

    //winston.level = 'error';


    describe('ProjectController', function () {
        it('throws - not called by ProjectController.getInstance()', function () {
            expect(function () {
                ctrl = new ProjectController();
            }).to.throw();
        });
        it('returns an controller instance', function () {
            ctrl = ProjectController.getInstance();
            expect(ctrl).to.equal(ProjectController.getInstance());
        });
        it('has setted router in constructor', function () {
            ctrl = ProjectController.getInstance();
            expect(ctrl.getRouter().prototype.toString()).to.equal(express.Router().prototype.toString());
        });
        it('spy calls router methods', function () {
            ctrl = ProjectController.getInstance();
            var router = ctrl.getRouter();
            var spyGet = sinon.spy(router, 'get'),
                spyPut = sinon.spy(router, 'put'),
                spyPost = sinon.spy(router, 'post'),
                spyDelete = sinon.spy(router, 'delete');
            ctrl.init();
            expect(spyPut.calledOnce).to.be.true; // called on /update
            expect(spyPost.calledOnce).to.be.true; // called on /create
            expect(spyDelete.calledOnce).to.be.true; // called on /remove
            expect(spyGet.calledTwice).to.be.true; // called on /open and /collection
        });

    });

}());
