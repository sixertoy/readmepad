/*jshint unused: false */
/*jslint indent: 4 */
/*global jasmine, process, require, define, describe, xdescribe, it, xit, expect, beforeEach, afterEach, afterLast, spyOn */
(function () {

    'use strict';

    var result, helper,
        cwd = process.cwd(),
        qPromiseFunc = function () {
            return {
                promise: 'yo! it\'s a promise',
                reject: function () {
                    return 'yo! promise rejected';
                },
                resolve: function () {
                    return 'yo! promise resolved';
                }
            };
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
        lodash = require('lodash'),
        //
        Utils = Path.join(cwd, 'src', 'server', 'lib', 'utils'),
        // exposed
        base = Path.join(cwd, 'src', 'server', 'lib', 'scandir'),
        Scandir = require(base),
        exec = require(base).exec,
        build = require(base).build,
        hasfiles = require(base).hasfiles;

    describe('scandir', function () {

        xdescribe('scandir.options()', function () {
            it('returns defaults options', function () {
                helper = new Scandir();
                result = helper.options();
                expect(result.root).toEqual('.');
                expect(result.depth).toEqual(0);
                expect(result.filters.length).toEqual(0);
            });
        });

        describe('scandir/exec/scandir.exec', function () {

            xit('returns Q.promise', function () {
                sinon.stub(FS, 'stat');
                sinon.stub(Q, 'defer', qPromiseFunc);
                helper = new Scandir();
                result = helper.exec('toto');
                expect(result).toEqual('yo! it\'s a promise');
                FS.stat.restore();
                Q.defer.restore();
            });

            it('returns a path', function () {
                var promise, p, e;
                sinon.stub(FS, 'stat');
                /* --- */
                p = '';
                helper = new Scandir();
                helper.exec(p);
                expect(helper.options().root).toEqual(process.cwd());
                //
                p = '.';
                helper = new Scandir();
                helper.exec(p);
                expect(helper.options().root).toEqual(process.cwd());
                //
                p = 'toto';
                helper = new Scandir();
                helper.exec(p);
                expect(helper.options().root).toEqual(Path.join(cwd, p));
                //
                p = Path.join(cwd, 'toto');
                helper = new Scandir();
                helper.exec(p);
                expect(helper.root).toEqual(Path.join(cwd, 'toto'));
                //
                p = Path.join(cwd, '..', '..', 'toto');
                helper = new Scandir();
                helper.exec(p);
                expect(helper.root).toEqual(Path.resolve(cwd, Path.join('..', '..', 'toto')));
                //
                p = Path.join(cwd, '..', '.', '..', 'toto');
                helper = new Scandir();
                helper.exec(p);
                expect(helper.root).toEqual(Path.resolve(cwd, Path.join('..', '.', '..', 'toto')));
                /* --- */
                expect(FS.stat.called).toEqual(true);
                FS.stat.restore();
            });

            it('Q.reject', function (done) {
                var msg = 'Invalid arguments. Aborted.';
                helper = new Scandir();
                helper.exec().then(function (data) {}, function (err) {
                    expect(err.message).toEqual(msg);
                    done();
                });
                helper.exec([]).then(function (data) {}, function (err) {
                    expect(err.message).toEqual(msg);
                    done();
                });
                helper.exec(123).then(function (data) {}, function (err) {
                    expect(err.message).toEqual(msg);
                    done();
                });
                helper.exec(null).then(function (data) {}, function (err) {
                    expect(err.message).toEqual(msg);
                    done();
                });
                helper.exec(undefined).then(function (data) {}, function (err) {
                    expect(err.message).toEqual(msg);
                    done();
                });
            });

            /*
            xit('does not throw', function () {
                var path = Path.join(cwd, 'spec', 'expected', 'explore_method');
                //
                exec(path).then(function (data) {
                    // no data
                }, function (err) {
                    done();
                });
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
            */

            it('reject w/ a non exists path', function (done) {
                var path = Path.join(cwd, 'spec', 'expected', 'non_exists');
                helper = new Scandir();
                helper.exec(path).then(function (data) {
                    // no data
                }, function (err) {
                    // returns an Error
                    expect(err.message).toEqual('Invalid path. Aborted.');
                    done();
                });
            });

            xit('reject w/ a FS.stat error', function (done) {
                var path = Path.join('/e/spec', 'expected', 'non_exists');
                helper = new Scandir();
                helper.exec(path).then(function (data) {
                    // no data
                }, function (err) {
                    // returns an Error
                    expect(err.hasOwnProperty('path')).toBe(true);
                    expect(err.hasOwnProperty('code')).toBe(true);
                    expect(err.hasOwnProperty('errno')).toBe(true);
                    done();
                });
            });

            xit('returns a plainObject w/ basename as property', function (done) {
                var name,
                    path = Path.join(cwd, 'spec', 'expected', 'explore_method');
                helper = new Scandir();
                helper.exec(path).then(function (data) {
                    name = Utils.dirname(path);
                    expect(lodash.isPlainObject(data)).toBe(true);
                    expect(data.name).toEqual(name);
                    done();
                }, function (err) {
                    // no error
                });
            });


            xit('returns a plainObject w/ basename as property, base is a dot', function (done) {
                var path = '.',
                    name = 'readmepad';
                scandir(path).then(function (data) {
                    // console.log(data);
                    expect(lodash.isPlainObject(data)).toBe(true);
                    expect(data.name).toEqual('readmepad');
                    done();
                }, function (err) {
                    // no error
                });
            });

            xit('reject w/ an error not directory', function (done) {
                var path = Path.join(cwd, 'spec', 'expected', 'not_directory'),
                    msg = 'Path is not a directory. Cancelled. Base: ' + path;
                scandir.exec(path).then(function (data) {
                    // no data
                }, function (err) {
                    expect(err.message).toEqual(msg);
                    done();
                });
            });

        });

        xdescribe('list items/build method', function () {
            var msg = 'Arguments missing. Aborted';
            it('throw', function () {
                expect(function () {
                    scandir.build();
                }).toThrow(msg);
                expect(function () {
                    scandir.build({}, '');
                }).toThrow(msg);
            });
        });

        xdescribe('scandir.hasfiles/hasfiles', function () {

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
                sinon.stub(Q, 'defer', qPromiseFunc);
                promise = scandir.hasfiles('toto');
                //
                expect(promise).toEqual('yo! promise');
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
