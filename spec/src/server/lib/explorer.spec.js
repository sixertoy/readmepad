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
        //
        Q = require('q'),
        FS = require('fs'),
        Path = require('path'),
        sinon = require('sinon'),
        Explorer = require(Path.join(cwd, 'src', 'server', 'lib', 'explorer'));

    describe('Explorer', function () {

        describe('hasFiles', function () {

            it('use FS.readdir', function () {
                var promise;
                sinon.stub(FS, 'readdir');
                Explorer.hasFiles('no_path_test');
                expect(FS.readdir.calledOnce).toEqual(true);
                FS.readdir.restore();
            });

            it('Q.reject called on non existent path', function (done) {
                Explorer.hasFiles('test_invalid_path').then(function(){
                }, function(err){
                    expect(err.message).toEqual('Invalid path. Aborted!');
                    done();
                });
            });

            it('Q.resolved with false - no file in folder', function (done) {
                var no_file_path = Path.join(cwd, 'spec', 'expected', 'hasfiles_method', 'nofile');
                Explorer.hasFiles(no_file_path).then(function(result){
                    expect(result).toEqual(false);
                    done();
                }, function(){
                });
            });

            it('Q.resolved with array of files - length 4', function (done) {
                var no_file_path = Path.join(cwd, 'spec', 'expected', 'hasfiles_method', 'threefile');
                Explorer.hasFiles(no_file_path).then(function(result){
                    expect(result.length).toEqual(4);
                    done();
                }, function(){
                });
            });

            it('returns Q.promise', function () {
                var promise;
                sinon.stub(FS, 'readdir');
                sinon.spy(Path, 'normalize');
                sinon.stub(Q, 'defer', function () {
                    return qPromise;
                });
                promise = Explorer.hasFiles('toto');
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
                    Explorer.hasFiles();
                }).toThrow('Explore.hasFiles needs one argument. Aborted!');
                expect(function () {
                    Explorer.hasFiles('');
                }).toThrow('Explore.hasFiles needs one argument. Aborted!');
                expect(function () {
                    Explorer.hasFiles(' ');
                }).toThrow('Explore.hasFiles needs one argument. Aborted!');
            });

        });

    });

}());
