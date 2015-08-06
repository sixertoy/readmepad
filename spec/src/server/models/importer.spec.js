/*jshint unused: false */
/*jslint indent: 4, nomen: true */
/*global __dirname, jasmine, process, require, define, describe, xdescribe, it, xit, expect, beforeEach, afterEach, afterLast, console */
(function () {

    'use strict';

    var result,
        cwd = process.cwd(),
        fs = require('fs'),
        path = require('path'),
        sinon = require('sinon'),
        importer = require(path.join(cwd, 'src', 'server', 'models', 'importer')),
        futils = require(path.join(cwd, 'src', 'server', 'helpers', 'file-utils'));

    describe('importer', function () {

        beforeEach(function () {});
        afterEach(function () {});

        describe('exec', function () {

            describe('method arguments', function () {
                it('fails needs params', function (done) {
                    importer.exec().then(function () {}, function (err) {
                        expect(err.message).toEqual('needs 3 arguments');
                        done();
                    });
                });
                it('fails needs params', function (done) {
                    importer.exec('', '').then(function () {}, function (err) {
                        expect(err.message).toEqual('needs 3 arguments');
                        done();
                    });
                });
                it('fails needs params', function (done) {
                    importer.exec('a name', []).then(function () {}, function (err) {
                        expect(err.message).toEqual('needs 3 arguments');
                        done();
                    });
                });
                it('fails needs params', function (done) {
                    importer.exec('a name', '').then(function () {}, function (err) {
                        expect(err.message).toEqual('needs 3 arguments');
                        done();
                    });
                });
                it('fails needs params', function (done) {
                    importer.exec('a name', 'not a path').then(function () {}, function (err) {
                        expect(err.message).toEqual('needs 3 arguments');
                        done();
                    });
                });
                it('fails needs params', function (done) {
                    importer.exec(1245, 'not a path').then(function () {}, function (err) {
                        expect(err.message).toEqual('needs 3 arguments');
                        done();
                    });
                });
                it('fails needs params', function (done) {
                    importer.exec('a name', 1243, 'c:\\path\\to\\folder').then(function () {}, function (err) {
                        expect(err.message).toEqual('needs 3 arguments');
                        done();
                    });
                });
                it('fails needs params', function (done) {
                    importer.exec('a name', '    ', false).then(function () {}, function (err) {
                        expect(err.message).toEqual('needs 3 arguments');
                        done();
                    });
                });
                it('fails needs params', function (done) {
                    importer.exec('a name', '    ', '').then(function () {}, function (err) {
                        expect(err.message).toEqual('needs 3 arguments');
                        done();
                    });
                });
                it('fails needs params', function (done) {
                    importer.exec('a name', '    ', 'c:\\path\\to\\folder').then(function () {}, function (err) {
                        expect(err.message).toEqual('needs 3 arguments');
                        done();
                    });
                });
                // ------------------------------ fails input arg not a path --------------------
                it('fails input path non exists/not a path', function (done) {
                    importer.exec('a name', '../file/path', '/path/to/folder').then(function () {}, function (err) {
                        expect(err.message).toEqual('invalid input path');
                        done();
                    });
                });
                it('fails input path non exists/not a path', function (done) {
                    importer.exec('a name', 'd:\\file\\to\\path', '/path/to/folder').then(function () {}, function (err) {
                        expect(err.message).toEqual('invalid input path');
                        done();
                    });
                });
                it('fails input path non exists/not a path', function (done) {
                    importer.exec('a name', '/file/to/path', '/path/to/folder').then(function () {}, function (err) {
                        expect(err.message).toEqual('invalid input path');
                        done();
                    });
                });
                xit('fails input path non exists/not a path', function (done) {
                    importer.exec('a name', 'http://google.com', '/path/to/folder').then(function () {}, function (err) {
                        expect(err.message).toEqual('invalid input path');
                        done();
                    });
                });
                // ------------------------------ not fails --------------------
                xit('not fails', function (done) {
                    importer.exec('a name', '../file/path', 'c:\\path\\to\\folder').then(function () {
                        done();
                    }, function (err) {});
                });
                xit('not fails', function (done) {
                    importer.exec('a name', 'http://github.com/user/repo', 'c:\\path\\to\\folder').then(function () {
                        fs.stat.restore();
                        done();
                    }, function (err) {});
                });
                xit('not fails', function (done) {
                    importer.exec('a name', 'git://github.com/user/repo', 'c:\\path\\to\\folder').then(function () {
                        done();
                    }, function (err) {});
                });
            });
            xdescribe('file-utils.tofilename is called', function () {
                it('call fsutils.filename', function (done) {
                    var n = 'a name',
                        spy = sinon.spy(futils, 'tofilename');
                    spy.withArgs(n);
                    sinon.stub(fs, 'stat');
                    importer.exec(n, 'http://github.com/user/repo', 'c:\\path\\to\\folder').then(function () {
                        expect(spy.withArgs(n).calledOnce).toBe(true);
                        fs.stat.restore();
                        done();
                    }, function () {});
                });
            });
            xdescribe('check if input exists', function () {
                it('fails not an absolute path', function (done) {
                    var n = 'a name',
                        spy = sinon.spy(futils, 'tofilename');
                    spy.withArgs(n);
                    importer.exec(n, '../controllers', 'c:\\path\\to\\folder').then(function () {}, function (err) {
                        expect(err.message).toBe('input must be an absolute path');
                        done();
                    });
                });
                it('fails', function (done) {
                    var n = 'a name',
                        spy = sinon.spy(futils, 'tofilename');
                    spy.withArgs(n);
                    importer.exec(n, 'c:\\path\\to\\folder', 'c:\\path\\to\\folder').then(function () {}, function (err) {
                        expect(err.message).toBe('unable to find input path');
                        done();
                    });
                });
            });
        });

    });

}());
