/*jshint unused: false */
/*jslint indent: 4, nomen: true */
/*global __dirname, process, require, define, describe, xdescribe, it, xit, expect, beforeEach, afterEach, afterLast, console */
(function () {

    'use strict';

    var result,
        cwd = process.cwd(),
        path = require('path'),
        expect = require('chai').expect,
        noop = require('utils/noop');

    describe('noop', function () {

        it('returns a function', function () {
            result = noop();
            expect(typeof result === 'function').to.be.true;
        });

    });

}());
