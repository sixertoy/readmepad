/*jshint unused: false */
/*jslint indent: 4, nomen: true */
/*global __dirname, process, require, define, describe, xdescribe, it, xit, expect, beforeEach, afterEach, afterLast, console */
(function () {

    'use strict';

    var result,
        promise = {
            state: "pending"
        },
        cwd = process.cwd(),
        Q = require('q'),
        fs = require('fs'),
        path = require('path'),
        sinon = require('sinon'),
        expect = require('chai').expect,
        agree = require(path.join(cwd, 'src', 'server', 'models', 'agree')),
        fxpath = path.join(cwd, 'spec', 'fixtures');

    describe('agreeModel', function () {

        beforeEach(function () {
            sinon.spy(Q, 'defer');
        });

        afterEach(function () {
            Q.defer.restore();
        });

        describe('_execPathCopy', function () {
            it('it throw', function () {
                var o = path.join(fxpath, '..', 'outputs');
                expect(function () {
                    agree._execPathCopy(null, o);
                }).to.throw('missing arguments');
            });
            it('it throw', function () {
                var p = path.join(fxpath, 'agree');
                expect(function () {
                    agree._execPathCopy(p, null);
                }).to.throw('missing arguments');
            });
            it('not fails copy success', function (done) {
                var p = path.join(fxpath, 'agree'),
                    o = path.join(fxpath, '..', 'outputs');
                result = agree._execPathCopy(p, o).then(function (res) {
                    expect(result.inspect()).to.deep.equal(promise);
                    expect(res).to.equal(true);
                    done();
                }, function (err) {
                    console.log(err);
                });
            });
        });

        describe('_execPathArchive', function () {
            it('not fails copy archive', function (done) {
                result = agree._execPathArchive().then(function (res) {
                    expect(result.inspect()).to.deep.equal(promise);
                    expect(res).to.equal(true);
                    done();
                }, function (err) {});
            });
        });

        describe('_execClone', function () {
            it('not fails clone success', function (done) {
                result = agree._execClone().then(function (res) {
                    expect(result.inspect()).to.deep.equal(promise);
                    expect(res).to.equal(true);
                    done();
                }, function (err) {});
            });
        });

        describe('_execURLArchive', function () {
            it('not fails download archive success', function (done) {
                result = agree._execURLArchive().then(function (res) {
                    expect(result.inspect()).to.deep.equal(promise);
                    expect(res).to.equal(true);
                    done();
                }, function (err) {});
            });
        });

        describe('exec', function () {

            describe('method arguments', function () {
                it('fails needs params', function (done) {
                    agree.exec().then(function () {}, function (err) {
                        expect(err.message).to.equal('needs 3 arguments');
                        done();
                    });
                });
                it('fails needs params', function (done) {
                    agree.exec('', '').then(function () {}, function (err) {
                        expect(err.message).to.equal('needs 3 arguments');
                        done();
                    });
                });
                it('fails needs params', function (done) {
                    agree.exec('a name', []).then(function () {}, function (err) {
                        expect(err.message).to.equal('needs 3 arguments');
                        done();
                    });
                });
                it('fails needs params', function (done) {
                    agree.exec('a name', '').then(function () {}, function (err) {
                        expect(err.message).to.equal('needs 3 arguments');
                        done();
                    });
                });
                it('fails needs params', function (done) {
                    agree.exec('a name', 'not a path').then(function () {}, function (err) {
                        expect(err.message).to.equal('needs 3 arguments');
                        done();
                    });
                });
                it('fails needs params', function (done) {
                    agree.exec(1245, 'not a path').then(function () {}, function (err) {
                        expect(err.message).to.equal('needs 3 arguments');
                        done();
                    });
                });
                it('fails needs params', function (done) {
                    agree.exec('a name', 1243, 'c:\\path\\to\\folder').then(function () {}, function (err) {
                        expect(err.message).to.equal('needs 3 arguments');
                        done();
                    });
                });
                it('fails needs params', function (done) {
                    agree.exec('a name', '    ', false).then(function () {}, function (err) {
                        expect(err.message).to.equal('needs 3 arguments');
                        done();
                    });
                });
                it('fails needs params', function (done) {
                    agree.exec('a name', '    ', '').then(function () {}, function (err) {
                        expect(err.message).to.equal('needs 3 arguments');
                        done();
                    });
                });
                it('fails needs params', function (done) {
                    agree.exec('a name', '    ', 'c:\\path\\to\\folder').then(function () {}, function (err) {
                        expect(err.message).to.equal('needs 3 arguments');
                        done();
                    });
                });
            });
            describe('input is not a path', function () {
                // ------------------------------ fails input arg not a path --------------------
                it('fails input path non exists/not a path', function (done) {
                    agree.exec('a name', '../file/path', '/path/to/folder').then(function () {}, function (err) {
                        expect(err.message).to.equal('input must be an absolute path');
                        done();
                    });
                });
                it('fails input path non exists/not a path', function (done) {
                    agree.exec('a name', 'd:\\file\\to\\path', '/path/to/folder').then(function () {}, function (err) {
                        expect(err.message).to.equal('input path does not exists');
                        done();
                    });
                });
                it('fails input path non exists/not a path', function (done) {
                    agree.exec('a name', '/file/to/path', '/path/to/folder').then(function () {}, function (err) {
                        expect(err.message).to.equal('input path does not exists');
                        done();
                    });
                });
                it('fails input path not a zip', function (done) {
                    agree.exec('a name', 'http://google.com', '/path/to/folder').then(function () {}, function (err) {
                        expect(err.message).to.equal('invalid url must target a zip file or a git repository');
                        done();
                    });
                });
                it('fails input path symlink', function (done) {
                    var p = path.join(fxpath, 'agree', 'symlink');
                    agree.exec('a name', p, '/path/to/folder').then(function () {}, function (err) {
                        expect(err.message).to.equal('invalid input, only zip file or directory allowed');
                        done();
                    });
                });
                it('fails git repo', function (done) {
                    agree.exec('a name', 'https://github.com/jonschlinkert/is-git-url', 'c:\\path\\to\\folder').then(function () {}, function (err) {
                        expect(err.message).to.equal('invalid url must target a zip file or a git repository');
                        done();
                    });
                });
                it('fails not a github repo', function (done) {
                    agree.exec('a name', 'http://github.com/user/repo', 'c:\\path\\to\\folder').then(function () {}, function (err) {
                        expect(err.message).to.equal('invalid url must target a zip file or a git repository');
                        done();
                    });
                });
            });

            describe('name is not valid', function () {
                it('reject invalid char', function(done){
                    var p = path.join(fxpath, 'agree');
                    agree.exec('a <name', p, '/path/to/folder').then(function () {}, function (err) {
                        expect(err.message).to.equal('invalid file name');
                        done();
                    });
                });
            });

            describe('sub commands', function () {

                beforeEach(function () {
                    // sinon.spy(agree, '_execClone'); //.returns(Q.resolve(true));
                    sinon.stub(agree, '_execPathCopy').returns(Q.resolve(true));
                    // sinon.spy(agree, '_execURLArchive');// .returns(Q.resolve(true));
                    // sinon.spy(agree, '_execPathArchive'); //.returns(Q.resolve(true));
                });

                afterEach(function () {
                    // agree._execClone.restore();
                    agree._execPathCopy.restore();
                    // agree._execURLArchive.restore();
                    // agree._execPathArchive.restore();
                });
                //
                // ------------------------------ not fails --------------------
                //
                it('success directory', function (done) {
                    var p = path.join(fxpath, 'agree');
                    result = agree.exec('a name', p, '/path/to/folder').then(function () {
                        expect(Q.defer.called).to.equal(true);
                        expect(result.inspect()).to.deep.equal(promise);
                        expect(agree._execPathCopy.calledOnce).to.equal(true);
                        done();
                    }, function (err) {
                        console.log(err.message);
                        done();
                    });
                });
                /*
                it('success url zip file', function (done) {
                    result = agree.exec('a name', 'http://google.com/file.zip', '/path/to/folder').then(function () {
                        expect(result.inspect()).to.equal(promise);
                        expect(Q.defer.called).to.be(true);
                        expect(agree._execURLArchive.calledOnce).to.be(true);
                        done();
                    }, function (err) {});
                });
                it('success zip file', function (done) {
                    var p = path.join(fxpath, 'agree', 'archive.zip');
                    result = agree.exec('a name', p, '/path/to/folder').then(function () {
                        expect(result.inspect()).to.equal(promise);
                        expect(Q.defer.called).to.be(true);
                        expect(agree._execPathArchive.calledOnce).to.be(true);
                        done();
                    }, function (err) {});
                });
                it('success http git repo', function (done) {
                    result = agree.exec('a name', 'https://github.com/jonschlinkert/is-git-url.git', 'c:\\path\\to\\folder').then(function () {
                        expect(result.inspect()).to.equal(promise);
                        expect(Q.defer.called).to.be(true);
                        expect(agree._execClone.calledOnce).to.be(true);
                        done();
                    }, function (err) {});
                });
                it('success git repo', function (done) {
                    result = agree.exec('a name', 'git://github.com/jonschlinkert/is-git-url.git', 'c:\\path\\to\\folder').then(function () {
                        expect(result.inspect()).to.equal(promise);
                        expect(Q.defer.called).to.be(true);
                        expect(agree._execClone.calledOnce).to.be(true);
                        done();
                    }, function (err) {});
                });
                */
            });
        });

    });

}());
