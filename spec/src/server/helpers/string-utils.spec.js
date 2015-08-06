/*jshint unused: false */
/*jslint indent: 4, nomen: true */
/*global __dirname, jasmine, process, require, define, describe, xdescribe, it, xit, expect, beforeEach, afterEach, afterLast, console */
(function () {

    'use strict';

    var result,
        cwd = process.cwd(),
        path = require('path'),
        utils = require(path.join(cwd, 'src', 'server', 'helpers', 'string-utils'));

    describe('string-utils', function () {

        xdescribe('tofilename', function () {
            it('throw cause empty arg', function () {
                expect(function () {
                    utils.tofilename();
                }).toThrow();
            });
            it('throw cause no string arg', function () {
                expect(function () {
                    utils.tofilename(123);
                }).toThrow();
            });
            it('not throw', function () {
                expect(function () {
                    utils.tofilename(' a name -"9çkdé');
                }).not.toThrow();
            });
            it('returns a filename', function () {
                result = utils.tofilename(' a <Bname -"9çkdé');
                expect(result).toEqual('a_bname_9_ckde');
            });
            it('returns a filename', function () {
                result = utils.tofilename(' a <Bname -"9çkdé');
                expect(result).toEqual('a_bname_9_ckde');
            });
            it('returns a filename', function () {
                result = utils.tofilename(' a <Bname ----"9çkdé');
                expect(result).toEqual('a_bname_9_ckde');
            });
        });

    });

}());
