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
        Utils = require(Path.join(cwd, 'src', 'server', 'lib', 'utils')),
        //
        // exposed
        base = Path.join(cwd, 'src', 'server', 'lib', 'scandir'),
        Scandir = require(base),
        exec = require(base).exec,
        build = require(base).build,
        hasfiles = require(base).hasfiles;

    describe('scandir', function () {

        describe('scandir.options()', function () {
            it('returns defaults options', function () {
                helper = new Scandir();
                result = helper.options();
                expect(result.root).toEqual('.');
                expect(result.depth).toEqual(0);
                expect(result.filters).toEqual([]);
            });
        });

        describe('scandir/exec/scandir.exec', function () {

            it('returns Q.promise', function () {
                helper = new Scandir();
                sinon.stub(FS, 'stat');
                sinon.stub(helper, 'build');
                sinon.stub(Q, 'defer', qPromiseFunc);
                result = helper.exec('toto');
                expect(result).toEqual('yo! it\'s a promise');
                helper.build.restore();
                FS.stat.restore();
                Q.defer.restore();
            });

            it('returns a path/test scandir.options().root', function () {
                var promise, p, e;
                helper = new Scandir();
                sinon.stub(FS, 'stat');
                sinon.stub(helper, 'build');
                /* --- */
                p = '';
                helper.exec(p);
                expect(helper.options().root).toEqual(process.cwd());
                //
                p = '.';
                helper.exec(p);
                expect(helper.options().root).toEqual(process.cwd());
                //
                p = 'toto';
                helper.exec(p);
                expect(helper.options().root).toEqual(Path.join(cwd, p));
                //
                p = Path.join(cwd, 'toto');
                helper.exec(p);
                expect(helper.options().root).toEqual(Path.join(cwd, 'toto'));
                //
                p = Path.join(cwd, '..', '..', 'toto');
                helper.exec(p);
                expect(helper.options().root).toEqual(Path.resolve(cwd, Path.join('..', '..', 'toto')));
                //
                p = Path.join(cwd, '..', '.', '..', 'toto');
                helper.exec(p);
                expect(helper.options().root).toEqual(Path.resolve(cwd, Path.join('..', '.', '..', 'toto')));
                /* --- */
                expect(FS.stat.called).toEqual(true);
                helper.build.restore();
                FS.stat.restore();
            });


            it('returns options with default root', function () {
                helper = new Scandir();
                var defaults = helper.options(),
                    opts = {
                        filters: ['**/*.hml'],
                        added: 'no default'
                    };
                helper.exec(opts);
                result = {
                    depth: 0,
                    root: process.cwd(),
                    added: 'no default',
                    filters: ['**/*.hml']
                }
                expect(helper.options()).toEqual(result);
            })

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

            it('does not reject', function (done) {
                var path = Path.join(cwd, 'spec', 'expected', 'explore_method');
                //
                helper = new Scandir();
                helper.exec(path).then(function (data) {
                    // no data
                    expect(helper.options().root).toEqual(path);
                    done();
                }, function (err) {});

                helper.exec(options).then(function (data) {
                    // no data
                    expect(helper.options().filters).toEqual(options.filters);
                    done();
                }, function (err) {});

                helper.exec(path, options).then(function (data) {
                    // no data
                    expect(helper.options().root).toEqual(path);
                    expect(helper.options().filters).toEqual(options.filters);
                    done();
                }, function (err) {});

            });

            it('reject w/ a FS.stat error', function (done) {
                var path = Path.join(cwd, 'spec', 'expected', 'non_exists');
                helper = new Scandir();
                helper.exec(path).then(function (data) {
                    // no data
                }, function (err) {
                    // returns an FS Error
                    expect(err.hasOwnProperty('path')).toBe(true);
                    expect(err.hasOwnProperty('code')).toBe(true);
                    expect(err.hasOwnProperty('errno')).toBe(true);
                    done();
                });
            });

            it('reject w/ not directory', function (done) {
                var path = Path.join(cwd, 'spec', 'expected', 'not_directory');
                helper = new Scandir();
                helper.exec(path).then(function (data) {
                    // no data
                }, function (err) {
                    // returns an Error
                    expect(err.message).toEqual('Invalid path. Aborted.');
                    done();
                });
            });

            it('returns a plainObject w/ basename as property', function (done) {
                var name,
                    path = Path.join(cwd, 'spec', 'expected', 'explore_method');
                name = Utils.dirname(path);
                //
                helper = new Scandir();
                helper.exec(path).then(function (data) {
                    expect(lodash.isPlainObject(data)).toBe(true);
                    expect(data.name).toEqual(name);
                    done();
                }, function (err) {});
                //
                path = '.';
                name = 'readmepad';
                helper.exec(path).then(function (data) {
                    expect(lodash.isPlainObject(data)).toBe(true);
                    expect(data.name).toEqual(name);
                    done();
                }, function (err) {
                    // no error
                });
            });

        });

        describe('scandir.hasfiles/hasfiles', function () {

            it('returns Q.promise', function () {
                var promise;
                sinon.stub(Q, 'defer', qPromiseFunc);
                helper = new Scandir();
                promise = helper.hasfiles('toto');
                expect(promise).toEqual('yo! it\'s a promise');
                Q.defer.restore();
            });

            it('use FS.readdir', function () {
                helper = new Scandir();
                sinon.stub(FS, 'readdir');
                helper.hasfiles('test_fs_readdir');
                expect(FS.readdir.calledOnce).toEqual(true);
                FS.readdir.restore();
            });

            it('Q.reject called on non existent path', function (done) {
                var msg = 'Invalid path. Aborted';
                helper = new Scandir();
                helper.hasfiles('test_invalid_path').then(function () {}, function (err) {
                    expect(err.message).toEqual(msg);
                    done();
                });
            });

            it('Q.resolved with false - no file in folder', function (done) {
                var no_file_path = Path.join(cwd, 'spec', 'expected', 'hasfiles_method', 'nofile');
                helper = new Scandir();
                helper.hasfiles(no_file_path).then(function (result) {
                    expect(result).toEqual(false);
                    done();
                }, function () {});
            });

            it('Q.resolved with array of files - length 4', function (done) {
                var no_file_path = Path.join(cwd, 'spec', 'expected', 'hasfiles_method', 'threefile');
                helper = new Scandir();
                helper.hasfiles(no_file_path).then(function (result) {
                    expect(result.length).toEqual(4);
                    done();
                }, function () {});
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

    });

}());
