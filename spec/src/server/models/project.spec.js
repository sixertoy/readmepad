/*jshint unused: false */
/*jslint indent: 4, nomen: true */
/*global __dirname, console, process, require, define, describe, xdescribe, it, xit, expect, beforeEach, afterEach, afterLast */
(function () {

    'use strict';

    var result, pid,
        dbname = 'project_model_spec',
        promise = {
            state: "pending"
        },
        //
        cwd = process.cwd(),
        fs = require('fs'),
        md5 = require('md5'),
        _ = require('lodash'),
        path = require('path'),
        sinon = require('sinon'),
        winston = require('winston'),
        expect = require('chai').expect,
        //
        dbfile = path.join(cwd, 'spec', 'fixtures', 'nedb', dbname + '.nedb'),
        projectModel = require(path.join(cwd, 'src', 'server', 'models', 'project'));

    winston.level = 'error';

    describe('projectModel', function () {

        describe('init(dbname, dbfile)', function () {
            it('reject missing arguments', function (done) {
                projectModel.init().then(function () {}, function (err) {
                    expect(err.message).to.equal('missing arguments');
                    done();
                });
            });
            it('reject non string arguments', function (done) {
                projectModel.init([], {}).then(function () {}, function (err) {
                    expect(err.message).to.equal('missing arguments');
                    done();
                });
            });
            it('reject empty arguments', function (done) {
                projectModel.init('   ', '   ').then(function () {}, function (err) {
                    expect(err.message).to.equal('missing arguments');
                    done();
                });
            });
            it('resolve load db', function (done) {
                projectModel.init(dbname, dbfile).then(function (res) {
                    expect(res).to.equal(true);
                    done();
                }, function (err) {});
            });
        });

        describe('getStore(dbname)', function () {
            var db;
            it('returns an object', function (done) {
                projectModel.init(dbname, dbfile).then(function () {
                    db = projectModel.getStore();
                    expect(_.isPlainObject(db)).to.equal(true);
                    expect(db.hasOwnProperty(dbname)).to.equal(true);
                    done();
                });
            });
            it('returns a db object', function (done) {
                projectModel.init(dbname, dbfile).then(function () {
                    db = projectModel.getStore(dbname);
                    expect(path.basename(db.filename)).to.equal(path.basename(dbfile));
                    done();
                });
            });
            it('returns false not a string', function (done) {
                projectModel.init(dbname, dbfile).then(function () {
                    db = projectModel.getStore(1234);
                    expect(db).to.equal(false);
                    done();
                });
            });
            it('returns false non exists db', function (done) {
                projectModel.init(dbname, dbfile).then(function () {
                    db = projectModel.getStore('no.db.name');
                    expect(db).to.equal(false);
                    done();
                });
            });
        });

        describe('findAll()', function () {
            // init de la BDD
            //
            it('reject missing arguments', function (done) {
                projectModel.init(dbname, dbfile).then(function () {
                    projectModel.findAll().then(function () {}, function (err) {
                        expect(err.message).to.equal('missing arguments');
                        done();
                    });
                });
            });
            it('no projects returns false', function (done) {
                projectModel.init(dbname, dbfile).then(function () {
                    projectModel.findAll(dbname).then(function (projects) {
                        expect(projects).to.equal(false);
                        done();
                    }, function (err) {});
                });
            });
        });

        describe('findOneProject()', function () {
            it('reject missing arguments', function (done) {
                projectModel.init(dbname, dbfile).then(function () {
                    projectModel.findOneProject().then(function () {}, function (err) {
                        expect(err.message).to.equal('missing arguments');
                        done();
                    });
                });
            });
            it('reject missing arguments', function (done) {
                projectModel.init(dbname, dbfile).then(function () {
                    projectModel.findOneProject(dbname, '    ').then(function () {}, function (err) {
                        expect(err.message).to.equal('missing arguments');
                        done();
                    });
                });
            });
            it('returns false no project', function (done) {
                projectModel.init(dbname, dbfile).then(function () {
                    projectModel.findOneProject(dbname, '_id.setted.by.nedb').then(function (project) {
                        expect(project).to.equal(false);
                        done();
                    });
                });
            });
        });

        describe('deleteProject()', function () {
            it('reject missing arguments', function (done) {
                projectModel.init(dbname, dbfile).then(function () {
                    projectModel.deleteProject().then(function () {}, function (err) {
                        expect(err.message).to.equal('missing arguments');
                        done();
                    });
                });
            });
            it('reject missing arguments', function (done) {
                projectModel.init(dbname, dbfile).then(function () {
                    projectModel.deleteProject(dbname, '    ').then(function () {}, function (err) {
                        expect(err.message).to.equal('missing arguments');
                        done();
                    });
                });
            });
            it('compact database', function (done) {
                projectModel.init(dbname, dbfile).then(function () {
                    var persistence = projectModel.getStore(dbname).persistence;
                    sinon.spy(persistence, 'compactDatafile');
                    projectModel.deleteProject(dbname, 'no.id.project').then(function (deleted) {
                        expect(deleted).to.equal(false);
                        expect(persistence.compactDatafile.called).to.equal(true);
                        persistence.compactDatafile.restore();
                        done();
                    });
                })
            });
        });

        describe('createProject()', function () {
            this.timeout(5000);
            it('pause', function (done) {
                setTimeout(done, 3000);
            });
            it('reject missing arguments', function (done) {
                projectModel.init(dbname, dbfile).then(function () {
                    projectModel.createProject().then(function () {}, function (err) {
                        expect(err.message).to.equal('missing arguments');
                        done();
                    });
                });
            });
            it('pause', function (done) {
                setTimeout(done, 3000);
            });
            it('resolve with new document', function (done) {
                projectModel.init(dbname, dbfile).then(function () {
                    var doc = {
                        name: 'a string whatever',
                        path: 'valid.abs.path.resolved.by.controller'
                    };
                    projectModel.createProject(dbname, doc.name, doc.path).then(function (project) {
                        expect(project.name).to.equal(doc.name);
                        expect(project.path).to.equal(doc.path);
                        expect(project.pid).to.equal(md5(doc.name)); // setted by model
                        expect(project.hasOwnProperty('_id')).to.equal(true);
                        pid = project._id;
                        done();
                    });
                })
            });
            it('pause', function (done) {
                setTimeout(done, 3000);
            });
            it('reject with false project already exists', function (done) {
                projectModel.init(dbname, dbfile).then(function () {
                    var doc = {
                        name: 'a string whatever',
                        path: 'valid.abs.path.resolved.by.controller'
                    };
                    projectModel.createProject(dbname, doc.name, doc.path).then(function () {}, function(err){
                        expect(err).to.equal(false);
                        done();
                    });
                })
            });
        });

        /*
        describe('findOneProject', function () {
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
