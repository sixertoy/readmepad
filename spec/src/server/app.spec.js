/*jshint unused: false */
/*jslint indent: 4, nomen: true */
/*global __dirname, process, require, define, describe, xdescribe, it, xit, expect, beforeEach, afterEach, afterLast, console */
(function () {

    'use strict';

    var result, app,
        serverStub = {
            use: function () {},
            toString: 'an experss.js instance'
        },
        include = require('include').root('./src/server'),
        path = require('path'),
        expect = require('chai').expect,
        // include
        Application = include('app'),
        ProjectController = include('controllers/project-controller');

    describe('helper', function () {

        describe('before app.init()', function () {

            it('throws - not called by Application.getInstance()', function () {
                expect(function () {
                    app = new Application();
                }).to.throw();
            });
            it('returns an application instance', function () {
                app = Application.getInstance();
                expect(app).to.equal(Application.getInstance());
            });
            describe('getController/getModel', function () {
                it('throws app.getModel()', function () {
                    app = Application.getInstance();
                    expect(function () {
                        app.getModel();
                    }).to.throw('Unable to load model: undefined');
                });
                it('throws app.getController()', function () {
                    app = Application.getInstance();
                    expect(function () {
                        app.getController();
                    }).to.throw('Unable to load controller: undefined');
                });
            });
            describe('app.getServer()', function () {
                it('returns false', function () {
                    app = Application.getInstance();
                    expect(app.getServer()).to.be.false;
                });
            });

        });

        describe('init() call', function () {
            app = Application.getInstance();
            it('throws', function () {
                expect(function () {
                    app.init()
                }).to.throw('missing arguments');
                expect(function () {
                    app.init(false)
                }).to.throw('missing arguments');
                expect(function () {
                    app.init(false, 1234)
                }).to.throw('missing arguments');
            });
            it('do not throws', function () {
                var cb = function () {
                    return 'callback called';
                };
                app = Application.getInstance();
                app.init(serverStub, cb);
            });
            it('has setted server', function () {
                expect(Application.getInstance().getServer()).to.equal(serverStub);
            });
            it('has setted controller', function () {
                var ctrl = Application.getInstance().getController('project'),
                    inst = ProjectController.getInstance();
                expect(ctrl).to.equal(inst);
            });
            it('returns the instance', function () {
                expect(app).to.equal(Application.getInstance());
            });
        });

    });

}());
