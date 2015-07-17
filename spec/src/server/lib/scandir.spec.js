/*jshint unused: false */
/*jslint indent: 4 */
/*global jasmine, process, require, define, describe, xdescribe, it, xit, expect, beforeEach, afterEach, afterLast, spyOn */
(function () {

    'use strict';

    var result,
        cwd = process.cwd(),
        qPromise = {
            promise: 'yo! promise',
            reject: function () {
                return 'yo! promise rejected';
            },
            resolve: function () {
                return 'yo! promise resolved';
            }
        },
        options = {
            depth: 1,
            filters: ['../*.md']
        },
        //
        Q = require('q'),
        FS = require('fs'),
        Path = require('path'),
        sinon = require('sinon'),
        //
        // exposed
        scandir = require(Path.join(cwd, 'src', 'server', 'lib', 'scandir')),
        exec = require(Path.join(cwd, 'src', 'server', 'lib', 'scandir')).exec,
        hasfiles = require(Path.join(cwd, 'src', 'server', 'lib', 'scandir')).hasfiles;

    describe('scandir', function () {

        describe('scandir', function () {

            it('does not throw', function () {
                var path = Path.join(cwd, 'spec', 'expected', 'explore_method');
                //
                expect(function () {
                    scandir();
                }).not.toThrow();
                expect(function () {
                    scandir(options);
                }).not.toThrow();
                expect(function () {
                    exec(path);
                }).not.toThrow();
                expect(function () {
                    scandir.exec(path, options);
                }).not.toThrow();
            });
            it('throw', function () {
                var err = 'Invalid arguments. Aborted.';
                expect(function () {
                    scandir(true);
                }).toThrow(err);
                expect(function () {
                    scandir([]);
                }).toThrow(err);
                expect(function () {
                    scandir(123);
                }).toThrow(err);
                expect(function () {
                    exec(null);
                }).toThrow(err);
                expect(function () {
                    scandir.exec(undefined);
                }).toThrow(err);
            });

        });

        describe('hasfiles', function () {

            it('use FS.readdir', function () {
                var promise;
                sinon.stub(FS, 'readdir');
                scandir.hasfiles('no_path_test');
                expect(FS.readdir.calledOnce).toEqual(true);
                FS.readdir.restore();
            });

            it('Q.reject called on non existent path', function (done) {
                var msg = 'Invalid path. Aborted';
                scandir.hasfiles('test_invalid_path').then(function () {}, function (err) {
                    expect(err.message).toEqual(msg);
                    done();
                });
            });

            it('Q.resolved with false - no file in folder', function (done) {
                var no_file_path = Path.join(cwd, 'spec', 'expected', 'hasfiles_method', 'nofile');
                scandir.hasfiles(no_file_path).then(function (result) {
                    expect(result).toEqual(false);
                    done();
                }, function () {});
            });

            it('Q.resolved with array of files - length 4', function (done) {
                var no_file_path = Path.join(cwd, 'spec', 'expected', 'hasfiles_method', 'threefile');
                scandir.hasfiles(no_file_path).then(function (result) {
                    expect(result.length).toEqual(4);
                    done();
                }, function () {});
            });

            it('returns Q.promise', function () {
                var promise;
                sinon.stub(FS, 'readdir');
                sinon.spy(Path, 'normalize');
                sinon.stub(Q, 'defer', function () {
                    return qPromise;
                });
                promise = scandir.hasfiles('toto');
                //
                expect(promise).toEqual('yo! promise');
                expect(Path.normalize.calledOnce).toEqual(true);
                //
                Path.normalize.restore();
                FS.readdir.restore();
                Q.defer.restore();
            });

            it('throw', function () {
                expect(function () {
                    scandir.hasfiles();
                }).toThrow('Needs one argument. Aborted');
                expect(function () {
                    scandir.hasfiles('');
                }).toThrow('Needs one argument. Aborted');
                expect(function () {
                    scandir.hasfiles(' ');
                }).toThrow('Needs one argument. Aborted');
            });

        });

    });

}());
