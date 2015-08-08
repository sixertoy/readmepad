/*jshint unused: false */
/*jslint indent: 4, nomen: true */
/*global __dirname, console, process, require, define, describe, xdescribe, it, xit, expect, beforeEach, afterEach, afterLast */
(function () {

    'use strict';

    var p, stats, project, dbname,
        cwd = process.cwd(),
        fs = require('fs'),
        md5 = require('md5'),
        path = require('path'),
        expect = require('chai').expect,
        dbfile = path.join(cwd, 'spec', 'fixtures', 'nedb', 'store.nedb'),
        storeModel = require(path.join(cwd, 'src', 'server', 'models', 'store'));

    describe('models/store', function () {

        describe('init', function () {
            it('create database', function (done) {
                dbname = 'store';
                storeModel.init(dbname, dbfile, function (err) {
                    if (err) {
                        console.log(err);
                    } else {
                        stats = fs.statSync(dbfile);
                        expect(stats.isFile()).to.equal(true);
                        done();
                    }
                });
            });
        });

        describe('findOneProject', function () {
            it('reject no argument', function (done) {
                storeModel.findOneProject().then(function (data) {}, function (err) {
                    expect(err.message).to.equal('needs 2 argument at least');
                    done();
                });
            });
            it('reject empty string', function (done) {
                storeModel.findOneProject('store', '').then(function (data) {}, function (err) {
                    expect(err.message).to.equal('needs 2 argument at least');
                    done();
                });
            });
            it('reject empty string', function (done) {
                dbname = 'store';
                storeModel.findOneProject(dbname, '     ').then(function (data) {}, function (err) {
                    expect(err.message).to.equal('needs 2 argument at least');
                    done();
                });
            });
            it('reject not a string', function (done) {
                dbname = 'store';
                storeModel.findOneProject(dbname, {}).then(function (data) {}, function (err) {
                    expect(err.message).to.equal('needs 2 argument at least');
                    done();
                });
            });
            it('resolve with false project not found', function (done) {
                dbname = 'store';
                var project_id = md5('toto/project');
                storeModel.findOneProject(dbname, project_id).then(function (data) {
                    expect(data).to.equal(false);
                    done();
                }, function (err) {});
            });
        });

        describe('createProject', function () {
            it('reject needs more argument', function (done) {
                storeModel.createProject().then(function () {}, function (err) {
                    expect(err.message).to.equal('needs 3 arguments at least');
                    done();
                });
            });
            it('reject needs more argument', function (done) {
                dbname = 'name';
                storeModel.createProject(dbname).then(function () {}, function (err) {
                    expect(err.message).to.equal('needs 3 arguments at least');
                    done();
                });
            });
            it('reject needs more argument', function (done) {
                dbname = 'name';
                storeModel.createProject(dbname, md5('path/project')).then(function () {}, function (err) {
                    expect(err.message).to.equal('needs 3 arguments at least');
                    done();
                });
            });
            it('create a new project', function (done) {
                var project_id,
                    name = 'toto',
                    fullpath = 'path/to/toto';
                dbname = 'store';
                storeModel.createProject(dbname, name, fullpath).then(function (doc) {
                    project_id = md5(fullpath);
                    expect(doc.project_id).to.equal(project_id);
                    done();
                }, function (err) {});
            });
            it('reject cause project already exists', function (done) {
                var name = 'toto',
                    fullpath = 'path/to/toto';
                dbname = 'store';
                storeModel.createProject(dbname, name, fullpath).then(function (doc) {}, function (err) {
                    expect(err.errorType).to.equal('uniqueViolated');
                    done();
                });
            });
        });

        describe('findOneProject', function () {
            it('returns a document', function (done) {
                dbname = 'store';
                var project_id = md5('path/to/toto');
                storeModel.findOneProject(dbname, project_id).then(function (doc) {
                    expect(project_id).to.equal(doc.project_id);
                    done();
                }, function (err) {});
            });
        });

        describe('deleteProject', function () {
            it('reject more argument', function (done) {
                storeModel.deleteProject().then(function () {}, function (err) {
                    expect(err.message).to.equal('needs 2 argument at least');
                    done();
                });
            });
            it('reject more argument', function (done) {
                dbname = 'store';
                storeModel.deleteProject(dbname).then(function () {}, function (err) {
                    expect(err.message).to.equal('needs 2 argument at least');
                    done();
                });
            });
            it('resolve with value 1', function (done) {
                dbname = 'store';
                var project_id = md5('path/to/toto');
                storeModel.deleteProject(dbname, project_id).then(function (num) {
                    expect(num).to.equal(1);
                    done();
                }, function () {});
            });
            it('resolve with value 0 if document not exists', function (done) {
                dbname = 'store';
                var project_id = md5('path/to/toto');
                storeModel.deleteProject(dbname, project_id).then(function (num) {
                    expect(num).to.equal(0);
                    done();
                }, function (err) {
                });
            });
        });

    });

}());
