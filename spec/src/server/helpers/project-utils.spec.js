/*jshint unused: false */
/*jslint indent: 4, nomen: true */
/*global __dirname, jasmine, process, require, define, describe, xdescribe, it, xit, expect, beforeEach, afterEach, afterLast, console */
(function () {

    'use strict';

    var cwd = process.cwd(),
        path = require('path'),
        scandir = require('scandir-async').exec,
        projectUtils = require(path.join(cwd, 'src', 'server', 'helpers', 'project-utils'));

    describe('projectUtils', function () {

        describe('files', function () {

            it('throw', function () {
                var msg = 'need 2 arguments at least.';
                expect(function () {
                    projectUtils.files();
                }).toThrow(msg);
                expect(function () {
                    projectUtils.files([], '');
                }).toThrow(msg);
                expect(function () {
                    projectUtils.files([], '    ');
                }).toThrow(msg);
                expect(function () {
                    projectUtils.files(false, 'fullpath/to/project');
                }).toThrow(msg);
                expect(function () {
                    projectUtils.files(123, 'fullpath/to/project');
                }).toThrow(msg);
            });

            it('not throw', function () {
                expect(function () {
                    projectUtils.files([], 'fullpath/to/project');
                }).not.toThrow();
            });

            it('returns false', function () {
                var files = [],
                    result = projectUtils.files(files, 'fullpath/to/project');
                expect(result).toEqual(false);
            });

            it('returns object', function (done) {
                var result, name,
                    fullpath = path.join(cwd, 'src', 'docs');
                scandir(fullpath).then(function (data) {
                    result = projectUtils.files(data.files, fullpath);
                    expect(Object.keys(result).length).toEqual(3);
                    name = path.join(cwd, 'src', 'docs', 'index.md');
                    expect(result[name]).toEqual('index.md');
                    name = path.join(cwd, 'src', 'docs', 'meta.json');
                    expect(result[name]).toEqual('meta.json');
                    name = path.join(cwd, 'src', 'docs', 'pages');
                    expect(result[name]).toEqual('pages');

                    done();
                }, function () {});
            });

        });

    });

}());
