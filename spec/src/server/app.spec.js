/*jshint unused: false */
/*jslint indent: 4, nomen: true */
/*global __dirname, process, require, define, describe, xdescribe, it, xit, expect, beforeEach, afterEach, afterLast, console */
(function () {

    'use strict';

    var result, app, server,
        serverStub = {
            use: function () {},
            toString: 'an experss.js instance'
        },
        // requires
        path = require('path'),
        express = require('express'),
        expect = require('chai').expect,
        bodyParser = require('body-parser'),
        include = require('include').root('./../../../src/server'),
        // includes
        Application = include('app'),
        ProjectController = include('controllers/project-controller');

    beforeEach(function () {
        server = express();
        server.use(bodyParser.json());
        server.use(bodyParser.urlencoded({
            extended: true
        }));
        app = null;
    });

    describe('Application', function () {

        describe('a new instance', function () {
            it('needs server param', function () {
                expect(function () {
                    app = new Application();
                }).to.throw();
            });
            it('call with server as param', function () {
                expect(function () {
                    app = new Application(server);
                }).to.not.throw();
            });
            it('throws app.getModel()', function () {
                expect(function () {
                    app = new Application(server);
                    app.getModel();
                }).to.throw('Unable to load model: undefined');
            });
            it('throws app.getController()', function () {
                expect(function () {
                    app = new Application(server);
                    app.getController();
                }).to.throw('Unable to load controller: undefined');
            });
            it('to be an instance of express router', function () {
                app = new Application(server);
                expect(app.getServer().prototype.toString()).to.equal(express.Router().prototype.toString());
            });
        });

        it('throws app.getController()', function () {
            expect(function () {
                app = new Application(server);
                app.getController();
            }).to.throw('Unable to load controller: undefined');
        });
        it('to be an instance of express router', function () {
            app = new Application(server);
            expect(app.getServer().prototype.toString()).to.equal(express.Router().prototype.toString());
        });

        describe('init method', function () {
            it('throws - no arguments', function () {
                expect(function () {
                    app = new Application(server);
                    app.init();
                }).to.throw('missing arguments');
            });
            it('not throws', function () {
                expect(function () {
                    app = new Application(server);
                    app.init(function () {});
                }).to.not.throw();
            });
            it('project controller has been setted', function () {
                app = new Application(server);
                app.init(function () {});
                var instance = app.getController('project');
                expect(instance instanceof ProjectController).to.be.true;
            });
        });

    });

}());
