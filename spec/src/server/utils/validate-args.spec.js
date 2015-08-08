/*jshint unused: false */
/*jslint indent: 4, nomen: true */
/*global __dirname, jasmine, process, require, define, describe, xdescribe, it, xit, expect, beforeEach, afterEach, afterLast, console */
(function () {

    'use strict';

    function buildArguments() {
        return arguments;
    }

    var result, args,
        cwd = process.cwd(),
        _ = require('lodash'),
        path = require('path'),
        expect = require('chai').expect,
        validate = require(path.join(cwd, 'src', 'server', 'utils', 'validate-args'));

    describe('Validate Function Arguments', function () {

        beforeEach(function () {});

        afterEach(function () {});

        it('throw', function () {
            expect(function () {
                validate();
            }).to.throw('unable to validate args');
        });

        it('throw', function () {
            expect(function () {
                validate({}, '');
            }).to.throw('unable to validate args');
        });

        it('returns true optionals arguments', function () {
            args = buildArguments(1224, '');
            result = validate(args, []);
            expect(result).to.equal(true);
        });

        it('returns false less arguments', function () {
            args = buildArguments();
            result = validate(args, [_.isString]);
            expect(result).to.equal(false);
        });

        describe('strings arguments', function () {
            it('returns false not string', function () {
                args = buildArguments(1224, '');
                result = validate(args, [_.isString, _.isString]);
                expect(result).to.equal(false);
            });
            it('returns false empty string', function () {
                args = buildArguments('no empty', '    ');
                result = validate(args, [_.isString, _.isString]);
                expect(result).to.equal(false);
            });
            it('returns true', function () {
                args = buildArguments('not empty', 'not empty');
                result = validate(args, [_.isString, _.isString]);
                expect(result).to.equal(true);
            });
        });

    });

}());