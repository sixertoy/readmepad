/*jshint unused: false */
/*jslint indent: 4, nomen: true */
/*global __dirname, console, jasmine, process, require, define, describe, xdescribe, it, xit, expect, beforeEach, afterEach, afterLast */
(function () {

    'use strict';

    var result, helper, stats, project, p,
        cwd = process.cwd(),
        fs = require('fs'),
        md5 = require('md5'),
        path = require('path'),
        dbfile = path.join(cwd, 'spec', 'fixtures', 'nedb', 'store.nedb'),
        storeModel = require(path.join(cwd, 'src', 'server', 'models', 'store'));

    describe('models/store', function () {

        describe('init', function () {
            it('create database', function (done) {
                storeModel.init(dbfile, function (err) {
                    if (err) {
                        console.log(err);
                    } else {
                        stats = fs.statSync(dbfile);
                        expect(stats.isFile()).toEqual(true);
                        done();
                    }
                });
            });
        });

        describe('findOneProject', function () {
            it('reject no argument', function (done) {
                storeModel.findOneProject().then(function (data) {}, function (err) {
                    expect(err.message).toEqual('needs 1 argument at least');
                    done();
                });
            });
            it('reject empty string', function (done) {
                storeModel.findOneProject('').then(function (data) {}, function (err) {
                    expect(err.message).toEqual('needs 1 argument at least');
                    done();
                });
            });
            it('reject empty string', function (done) {
                storeModel.findOneProject('     ').then(function (data) {}, function (err) {
                    expect(err.message).toEqual('needs 1 argument at least');
                    done();
                });
            });
            it('reject not a string', function (done) {
                storeModel.findOneProject({}).then(function (data) {}, function (err) {
                    expect(err.message).toEqual('needs 1 argument at least');
                    done();
                });
            });
            it('resolve with false project not found', function (done) {
                project = 'toto/project';
                storeModel.findOneProject(project).then(function (data) {
                    expect(data).toEqual(false);
                    done();
                }, function (err) {});
            });
        });

        describe('createProject', function () {
            it('reject needs more argument', function (done) {
                storeModel.createProject().then(function () {}, function (err) {
                    expect(err.message).toEqual('needs 3 arguments at least');
                    done();
                });
            });
            it('reject needs more argument', function (done) {
                storeModel.createProject('name').then(function () {}, function (err) {
                    expect(err.message).toEqual('needs 3 arguments at least');
                    done();
                });
            });
            it('reject needs more argument', function (done) {
                storeModel.createProject('name', 'path/project').then(function () {}, function (err) {
                    expect(err.message).toEqual('needs 3 arguments at least');
                    done();
                });
            });
            it('create a new project', function (done) {
                var name = 'toto',
                    p = 'path/to/toto',
                    pages = [{
                        fileone: 'path/to/toto/fileone',
                        filetwo: 'path/to/toto/filetwo'
                    }];
                storeModel.createProject(name, p, pages).then(function (doc) {
                    p = md5(p);
                    expect(doc.project_id).toEqual(p);
                    done();
                }, function (err) {});
            });
            it('reject cause project already exists', function (done) {
                var name = 'toto',
                    p = 'path/to/toto',
                    pages = [{
                        fileone: 'path/to/toto/fileone',
                        filetwo: 'path/to/toto/filetwo'
                    }];
                storeModel.createProject(name, p, pages).then(function (doc) {
                }, function (err) {
                    expect(err.errorType).toEqual('uniqueViolated');
                    done();
                });
            });
        });

        xdescribe('findOneProject', function () {
            it('returns a document', function (done) {
                project = '/toto/project';
                storeModel.findOneProject(project).then(function (data) {
                    expect(data).toEqual(false);
                    done();
                }, function (err) {});
            });
        });

    });

}());
