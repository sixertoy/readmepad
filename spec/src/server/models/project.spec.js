/*jshint unused: false */
/*jslint indent: 4, nomen: true */
/*global __dirname, console, process, require, define, describe, xdescribe, it, xit, expect, beforeEach, afterEach, afterLast */
(function () {

    'use strict';

    var pid, projectModel, db,
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
        ProjectModel = require(path.join(cwd, 'src', 'server', 'models', 'project'));

    winston.level = 'error';

    describe('projectModel', function () {

        beforeEach(function(){
            db = null;
            projectModel = new ProjectModel();
        });

        afterEach(function(){
            projectModel = null;
        });

        describe('init(dbfile)', function () {
            it('reject missing arguments', function (done) {
                projectModel.init().then(function () {}, function (err) {
                    expect(err.message).to.equal('missing arguments');
                    done();
                });
            });
            it('reject non string arguments', function (done) {
                projectModel.init({}).then(function () {}, function (err) {
                    expect(err.message).to.equal('missing arguments');
                    done();
                });
            });
            it('reject empty arguments', function (done) {
                projectModel.init('   ').then(function () {}, function (err) {
                    expect(err.message).to.equal('missing arguments');
                    done();
                });
            });
            it('resolve load db created file', function (done) {
                projectModel.init(dbfile).then(function (store) {
                    expect(fs.statSync(dbfile)).to.be.an('object');
                    done();
                }, function (err) {});
            });
        });

        describe('store()', function () {
            it('returns db store', function (done) {
                projectModel.init(dbfile).then(function (store) {
                    db = projectModel.store();
                    expect(db).to.equal(store);
                    expect(path.basename(db.filename)).to.equal(path.basename(dbfile));
                    done();
                });
            });
        });

        describe('findAll()', function () {
            it('resolve false empty projects list', function (done) {
                projectModel.init(dbfile).then(function () {
                    projectModel.findAll().then(function (projects) {
                        expect(projects).to.be.false;
                        done();
                    }, function (err) {});
                });
            });
        });

        describe('findOneProject()', function () {
            it('reject missing arguments', function (done) {
                projectModel.init(dbfile).then(function () {
                    projectModel.findOneProject().then(function () {}, function (err) {
                        expect(err.message).to.equal('missing arguments');
                        done();
                    });
                });
            });
            it('reject missing arguments', function (done) {
                projectModel.init(dbfile).then(function () {
                    projectModel.findOneProject('    ').then(function () {}, function (err) {
                        expect(err.message).to.equal('missing arguments');
                        done();
                    });
                });
            });
            it('resolve false no project in BDD', function (done) {
                projectModel.init(dbfile).then(function () {
                    projectModel.findOneProject('_id.setted.by.nedb').then(function (project) {
                        expect(project).to.be.false;
                        done();
                    });
                });
            });
        });

        describe('deleteProject()', function () {
            it('reject missing arguments', function (done) {
                projectModel.init(dbfile).then(function () {
                    projectModel.deleteProject().then(function () {}, function (err) {
                        expect(err.message).to.equal('missing arguments');
                        done();
                    });
                });
            });
            it('reject missing arguments', function (done) {
                projectModel.init(dbfile).then(function () {
                    projectModel.deleteProject('    ').then(function () {}, function (err) {
                        expect(err.message).to.equal('missing arguments');
                        done();
                    });
                });
            });
            it('spy compact database', function (done) {
                projectModel.init(dbfile).then(function () {
                    var persistence = projectModel.store().persistence;
                    sinon.spy(persistence, 'compactDatafile');
                    projectModel.deleteProject('no.id.project').then(function (deleted) {
                        expect(deleted).to.be.false;
                        expect(persistence.compactDatafile.called).to.be.true;
                        persistence.compactDatafile.restore();
                        done();
                    });
                })
            });
        });

        describe('createProject()', function () {
            this.timeout(5000);
            it('pause', function (done) {
                setTimeout(done, 2000);
            });
            it('reject missing arguments', function (done) {
                projectModel.init(dbfile).then(function () {
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
                projectModel.init(dbfile).then(function () {
                    var doc = {
                        name: 'a string whatever',
                        path: 'valid.abs.path.resolved.by.controller'
                    };
                    projectModel.createProject(doc.name, doc.path).then(function (project) {
                        expect(project.name).to.equal(doc.name);
                        expect(project.path).to.equal(doc.path);
                        expect(project.pid).to.equal(md5(doc.name)); // setted by model
                        expect(project.hasOwnProperty('_id')).to.be.true;
                        pid = project._id;
                        done();
                    });
                })
            });
            it('pause', function (done) {
                setTimeout(done, 2000);
            });
            it('reject with false project already exists', function (done) {
                projectModel.init(dbfile).then(function () {
                    var doc = {
                        name: 'a string whatever',
                        path: 'valid.abs.path.resolved.by.controller'
                    };
                    projectModel.createProject(doc.name, doc.path).then(function () {}, function (err) {
                        expect(err).to.be.false;
                        done();
                    });
                })
            });
        });

        describe('findAll()', function () {
            this.timeout(5000);
            it('pause', function (done) {
                setTimeout(done, 2000);
            });
            it('resolve list of projects', function (done) {
                projectModel.init(dbfile).then(function () {
                    projectModel.findAll().then(function (projects) {
                        expect(projects).is.an('array');
                        expect(projects.length).to.equal(1);
                        expect(projects[0]._id).to.equal(pid);
                        done();
                    }, function (err) {});
                });
            });
        });

        describe('findOneProject()', function () {
            this.timeout(5000);
            it('pause', function (done) {
                setTimeout(done, 2000);
            });
            it('retrieve one project', function (done) {
                projectModel.init(dbfile).then(function () {
                    projectModel.findOneProject(pid).then(function (project) {
                        expect(project).is.an('object');
                        expect(project._id).to.equal(pid);
                        //
                        // description de l'objet en BDD
                        expect(project).to.include.keys('_id');
                        expect(project).to.include.keys('pid');
                        expect(project).to.include.keys('name');
                        expect(project).to.include.keys('path');
                        done();
                    });
                });
            });
        });

        describe('updateProject()', function () {
            this.timeout(5000);
            it('pause', function (done) {
                setTimeout(done, 2000);
            });
            it('reject missing arguments', function (done) {
                projectModel.init(dbfile).then(function () {
                    projectModel.updateProject().then(function () {}, function (err) {
                        expect(err.message).to.equal('missing arguments');
                        done();
                    });
                });
            });
            it('pause', function (done) {
                setTimeout(done, 2000);
            });
            it('reject missing arguments', function (done) {
                projectModel.init(dbfile).then(function () {
                    projectModel.updateProject('').then(function () {}, function (err) {
                        expect(err.message).to.equal('missing arguments');
                        done();
                    });
                });
            });
            it('pause', function (done) {
                setTimeout(done, 2000);
            });
            it('reject no _id props missing arguments', function (done) {
                projectModel.init(dbfile).then(function () {
                    projectModel.updateProject({
                        name: 'toto'
                    }).then(function () {}, function (err) {
                        expect(err.message).to.equal('missing arguments');
                        done();
                    });
                });
            });
            it('pause', function (done) {
                setTimeout(done, 2000);
            });
            it('reject with nothing to update', function (done) {
                projectModel.init(dbname, dbfile).then(function () {
                    projectModel.updateProject({
                        _id: pid
                    }).then(function () {}, function (err) {
                        expect(err.message).to.equal('nothing to update');
                        done();
                    });
                });
            });
            it('pause', function (done) {
                setTimeout(done, 2000);
            });
            it('resolve with true', function (done) {
                projectModel.init(dbfile).then(function () {
                    projectModel.updateProject({
                        _id: pid,
                        name: 'a new name'
                    }).then(function (updated) {
                        expect(updated).to.be.true;
                        done();
                    }, function (err) {});
                });
            });
        });

        describe('findOneProject()', function () {
            this.timeout(5000);
            it('pause', function (done) {
                setTimeout(done, 2000);
            });
            it('resolve project name and path has been updated', function (done) {
                projectModel.init(dbfile).then(function () {
                    projectModel.findOneProject(pid).then(function (project) {
                        expect(project.name).to.equal('a new name');
                        expect(project.path).to.equal(md5('a new name'));
                        done();
                    });
                });
            });
        });

        describe('updateProject()', function () {
            this.timeout(5000);
            it('pause', function (done) {
                setTimeout(done, 2000);
            });
            it('change path only', function (done) {
                projectModel.init(dbfile).then(function () {
                    projectModel.updateProject({
                        _id: pid,
                        path: 'a new path not valid but not fails'
                    }).then(function (updated) {
                        expect(updated).to.be.true;
                        done();
                    }, function (err) {});
                });
            });
        });

        describe('findOneProject()', function () {
            this.timeout(5000);
            it('pause', function (done) {
                setTimeout(done, 2000);
            });
            it('resolve project path only has been updated', function (done) {
                projectModel.init(dbfile).then(function () {
                    projectModel.findOneProject(pid).then(function (project) {
                        expect(project.path).to.equal('a new path not valid but not fails');
                        done();
                    });
                });
            });
        });

        describe('deleteProject()', function () {
            it('resolve with true project deleted', function (done) {
                this.timeout(5000);
                it('pause', function (done) {
                    setTimeout(done, 2000);
                });
                projectModel.init(dbfile).then(function () {
                    var persistence = projectModel.store().persistence;
                    sinon.spy(persistence, 'compactDatafile');
                    projectModel.deleteProject(pid).then(function (deleted) {
                        expect(deleted).to.be.true;
                        expect(persistence.compactDatafile.called).to.be.true;
                        persistence.compactDatafile.restore();
                        done();
                    });
                })
            });
        });

    });
}());
