/*jshint unused: false */
/*jslint indent: 4, nomen: true */
/*global __dirname, console, jasmine, process, require, define, describe, xdescribe, it, xit, expect, beforeEach, afterEach, afterLast */
(function () {

    'use strict';

    var p, stats, project, dbname,
        cwd = process.cwd(),
        fs = require('fs'),
        md5 = require('md5'),
        path = require('path'),
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
                        expect(stats.isFile()).toEqual(true);
                        done();
                    }
                });
            });
        });

        describe('findOneProject', function () {
            it('reject no argument', function (done) {
                storeModel.findOneProject().then(function (data) {}, function (err) {
                    expect(err.message).toEqual('needs 2 argument at least');
                    done();
                });
            });
            it('reject empty string', function (done) {
                storeModel.findOneProject('store', '').then(function (data) {}, function (err) {
                    expect(err.message).toEqual('needs 2 argument at least');
                    done();
                });
            });
            it('reject empty string', function (done) {
                dbname = 'store';
                storeModel.findOneProject(dbname, '     ').then(function (data) {}, function (err) {
                    expect(err.message).toEqual('needs 2 argument at least');
                    done();
                });
            });
            it('reject not a string', function (done) {
                dbname = 'store';
                storeModel.findOneProject(dbname, {}).then(function (data) {}, function (err) {
                    expect(err.message).toEqual('needs 2 argument at least');
                    done();
                });
            });
            it('resolve with false project not found', function (done) {
                dbname = 'store';
                project = 'toto/project';
                storeModel.findOneProject(dbname, project).then(function (data) {
                    expect(data).toEqual(false);
                    done();
                }, function (err) {});
            });
        });

        describe('createProject', function () {
            it('reject needs more argument', function (done) {
                storeModel.createProject().then(function () {}, function (err) {
                    expect(err.message).toEqual('needs 4 arguments at least');
                    done();
                });
            });
            it('reject needs more argument', function (done) {
                dbname = 'name';
                storeModel.createProject(dbname).then(function () {}, function (err) {
                    expect(err.message).toEqual('needs 4 arguments at least');
                    done();
                });
            });
            it('reject needs more argument', function (done) {
                dbname = 'name';
                storeModel.createProject(dbname, 'path/project').then(function () {}, function (err) {
                    expect(err.message).toEqual('needs 4 arguments at least');
                    done();
                });
            });
            it('create a new project', function (done) {
                var name = 'toto',
                    p = 'path/to/toto',
                    pages = {
                        fileone: 'path/to/toto/fileone',
                        filetwo: 'path/to/toto/filetwo'
                    };
                dbname = 'store';
                storeModel.createProject(dbname, name, p, pages).then(function (doc) {
                    p = md5(p);
                    expect(doc.project_id).toEqual(p);
                    done();
                }, function (err) {});
            });
            it('reject cause project already exists', function (done) {
                var name = 'toto',
                    p = 'path/to/toto',
                    pages = {
                        fileone: 'path/to/toto/fileone',
                        filetwo: 'path/to/toto/filetwo'
                    };
                dbname = 'store';
                storeModel.createProject(dbname, name, p, pages).then(function (doc) {}, function (err) {
                    expect(err.errorType).toEqual('uniqueViolated');
                    done();
                });
            });
        });

        describe('findOneProject', function () {
            it('returns a document', function (done) {
                dbname = 'store';
                project = 'path/to/toto';
                storeModel.findOneProject(dbname, project).then(function (doc) {
                    expect(md5(project)).toEqual(doc.project_id);
                    done();
                }, function (err) {});
            });
        });

        describe('deleteProject', function () {
            it('reject more argument', function (done) {
                dbname = 'store';
                storeModel.deleteProject(dbname).then(function () {}, function (err) {
                    expect(err.message).toEqual('needs 2 argument at least');
                    done();
                });
            });
            it('reject more argument', function (done) {
                dbname = 'store';
                storeModel.deleteProject(dbname, {}).then(function () {}, function (err) {
                    expect(err.message).toEqual('needs 2 argument at least');
                    done();
                });
            });
            it('reject more argument', function (done) {
                dbname = 'store';
                storeModel.deleteProject(dbname, '').then(function () {}, function (err) {
                    expect(err.message).toEqual('needs 2 argument at least');
                    done();
                });
            });
            it('reject more argument', function (done) {
                dbname = 'store';
                storeModel.deleteProject(dbname, '     ').then(function () {}, function (err) {
                    expect(err.message).toEqual('needs 2 argument at least');
                    done();
                });
            });
            it('resolve with value 1', function (done) {
                dbname = 'store';
                project = 'path/to/toto';
                storeModel.deleteProject(dbname, project).then(function (num) {
                    expect(num).toEqual(1);
                    done();
                }, function () {});
            });
            it('resolve with value 0 if document not exists', function (done) {
                dbname = 'store';
                project = 'path/to/toto';
                storeModel.deleteProject(dbname, project).then(function (num) {
                    expect(num).toEqual(0);
                    done();
                }, function (err) {
                });
            });
        });

    });

}());
