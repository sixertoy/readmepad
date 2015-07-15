/*jshint unused: false */
/*jslint indent: 4 */
/*global jasmine, process, require, define, describe, xdescribe, it, xit, expect, beforeEach, afterEach, afterLast, spyOn */
(function () {

    'use strict';

    var result,
        cwd = process.cwd(),
        //
        Q = require('q'),
        FS = require('fs'),
        Path = require('path'),
        sinon = require('sinon'),
        Explorer = require(Path.join(cwd, 'src', 'server', 'lib', 'explorer'));

    describe('Explorer', function () {

        describe('folderHasFiles', function () {

            it('use FS.readdir', function () {
                var promise;
                sinon.stub(FS, 'readdir');
                Explorer.folderHasFiles('toto');
                expect(FS.readdir.calledOnce).toBe(true);
                FS.readdir.restore();
            });

            xit('returns Q.promise', function () {
                var promise;
                sinon.stub(FS, 'readdir');
                promise = Explorer.folderHasFiles('toto');
                // expect(promise).toBe('promise');
                FS.readdir.restore();
            });

            it('throw', function () {
                expect(function () {
                    Explorer.folderHasFiles();
                }).toThrow('Explore.folderHasFiles needs one argument. Aborted!');
                expect(function () {
                    Explorer.folderHasFiles('');
                }).toThrow('Explore.folderHasFiles needs one argument. Aborted!');
                expect(function () {
                    Explorer.folderHasFiles(' ');
                }).toThrow('Explore.folderHasFiles needs one argument. Aborted!');
            });

        });

    });

}());
