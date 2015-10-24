/*jshint unused: false */
/*jslint indent: 4, nomen: true */
/*global __dirname, process, require, define, describe, xdescribe, it, xit, expect, beforeEach, afterEach, afterLast, console */
(function () {

    'use strict';

    var result,
        cwd = process.cwd(),
        path = require('path'),
        expect = require('chai').expect,
        toarray = require('lodash.toarray'),
        // helper
        args = require('utils/args');

    describe('args stubs function arguments', function () {

        it('return empty array', function () {
            result = args();
            result = toarray(result);
            expect(result.length).to.equal(0);
        });

        it('return arguments as it', function () {
            result = args(1234, 'yes', true);
            result = toarray(result);
            expect(result.length).to.equal(3);
            expect(result[0]).to.equal(1234);
            expect(result[1]).to.equal('yes');
            expect(result[2]).to.be.true;
        });

    });

}());
