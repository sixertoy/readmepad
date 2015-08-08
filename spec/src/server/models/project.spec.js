/*jshint unused: false */
/*jslint indent: 4, nomen: true */
/*global __dirname, console, process, require, define, describe, xdescribe, it, xit, expect, beforeEach, afterEach, afterLast */
(function () {

    'use strict';

    var result,
        dbname = 'project_model_spec',
        promise = {
            state: "pending"
        },
        //
        cwd = process.cwd(),
        fs = require('fs'),
        md5 = require('md5'),
        path = require('path'),
        winston = require('winston'),
        expect = require('chai').expect,
        //
        dbfile = path.join(cwd, 'spec', 'fixtures', 'nedb', dbname + '.nedb'),
        projectModel = require(path.join(cwd, 'src', 'server', 'models', 'project'));

    winston.level = 'error';

    describe('projectModel', function () {

        describe('init(dbname, dbfile)', function () {
            it('reject missing arguments', function (done) {
                result = projectModel.init().then(function(){}, function(err){
                    expect(err.message).to.equal('missing arguments');
                    done();
                });
            });
            it('reject non string arguments', function (done) {
                result = projectModel.init([], {}).then(function(){}, function(err){
                    expect(err.message).to.equal('missing arguments');
                    done();
                });
            });
            it('reject empty arguments', function (done) {
                result = projectModel.init('   ', '   ').then(function(){}, function(err){
                    expect(err.message).to.equal('missing arguments');
                    done();
                });
            });
        });

        xdescribe('findAll()', function () {
            it('no project returns false', function (done) {
                projectModel.findAll(dbname, dbfile).then(function (created) {
                    expect(created).to.equal(true);
                    done();
                }, function (err) {});
            });
            it('resolve with false', function (done) {
                projectModel.init(dbname, dbfile).then(function (res) {
                    expect(res).to.equal(true);
                    expect(fs.statSync(dbfile).isFile()).to.equal(true);
                    done();
                });
            });
        });

        /*
        describe('findOneProject', function () {
            it('reject no argument', function (done) {
                projectModel.findOneProject().then(function (data) {}, function (err) {
                    expect(err.message).to.equal('needs 2 argument at least');
                    done();
                });
            });
            it('reject empty string', function (done) {
                projectModel.findOneProject('store', '').then(function (data) {}, function (err) {
                    expect(err.message).to.equal('needs 2 argument at least');
                    done();
                });
            });
            it('reject empty string', function (done) {
                dbname = 'store';
                projectModel.findOneProject(dbname, '     ').then(function (data) {}, function (err) {
                    expect(err.message).to.equal('needs 2 argument at least');
                    done();
                });
            });
            it('reject not a string', function (done) {
                dbname = 'store';
                projectModel.findOneProject(dbname, {}).then(function (data) {}, function (err) {
                    expect(err.message).to.equal('needs 2 argument at least');
                    done();
                });
            });
            it('resolve with false project not found', function (done) {
                dbname = 'store';
                var project_id = md5('toto/project');
                projectModel.findOneProject(dbname, project_id).then(function (data) {
                    expect(data).to.equal(false);
                    done();
                }, function (err) {});
            });
        });
        */

        /*
        describe('createProject', function () {
            it('reject needs more argument', function (done) {
                projectModel.createProject().then(function () {}, function (err) {
                    expect(err.message).to.equal('needs 2 arguments at least');
                    done();
                });
            });
            it('reject needs more argument', function (done) {
                dbname = 'name';
                projectModel.createProject(dbname).then(function () {}, function (err) {
                    expect(err.message).to.equal('needs 2 arguments at least');
                    done();
                });
            });
            it('reject doc not an object', function (done) {
                var project_id,
                    name = 'toto',
                    path = 'path/to/toto'
                dbname = 'store';
                projectModel.createProject(dbname, name, path).then(function (doc) {}, function (err) {
                    expect(err.message).to.equal('document is not valid');
                    done();
                });
            });
            it('create a new project', function (done) {
                var pid,
                    doc = {
                        name: 'toto',
                        path: 'path/to/toto'
                    };
                dbname = 'store';
                projectModel.createProject(dbname, doc).then(function (res) {
                    pid = md5(doc.path);
                    expect(res.pid).to.equal(pid);
                    done();
                }, function (err) {});
            });
            it('reject cause project already exists', function (done) {
                var doc = {
                        name: 'toto',
                        path: 'path/to/toto'
                    };
                dbname = 'store';
                projectModel.createProject(dbname, doc).then(function (doc) {}, function (err) {
                    expect(err.errorType).to.equal('uniqueViolated');
                    done();
                });
            });
        });
        */

        /*
        describe('findOneProject', function () {
            it('returns a document', function (done) {
                dbname = 'store';
                var pid = md5('path/to/toto');
                projectModel.findOneProject(dbname, pid).then(function (doc) {
                    expect(pid).to.equal(doc.pid);
                    done();
                }, function (err) {});
            });
        });
        */

        /*
        describe('deleteProject', function () {
            it('reject more argument', function (done) {
                projectModel.deleteProject().then(function () {}, function (err) {
                    expect(err.message).to.equal('needs 2 argument at least');
                    done();
                });
            });
            it('reject more argument', function (done) {
                dbname = 'store';
                projectModel.deleteProject(dbname).then(function () {}, function (err) {
                    expect(err.message).to.equal('needs 2 argument at least');
                    done();
                });
            });
            it('resolve with value 1', function (done) {
                dbname = 'store';
                var pid = md5('path/to/toto');
                projectModel.deleteProject(dbname, pid).then(function (num) {
                    expect(num).to.equal(1);
                    done();
                }, function () {});
            });
            it('resolve with value 0 if document not exists', function (done) {
                dbname = 'store';
                var pid = md5('path/to/toto');
                projectModel.deleteProject(dbname, pid).then(function (num) {
                    expect(num).to.equal(0);
                    done();
                }, function (err) {
                });
            });
        });
        */

    });

}());
