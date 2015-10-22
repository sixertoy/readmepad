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
        path = require('path'),
        expect = require('chai').expect,
        isstring = require('lodash.isstring'),
        validate = require(path.join(cwd, 'src/server/utils/validate-args')).exec;

    describe('Validate Function Arguments', function () {

        beforeEach(function () {});

        afterEach(function () {});

        it('not throw', function () {
            result = validate();
            expect(result).to.be.true;
        });

        it('throw not args', function () {
            expect(function () {
                validate({}, [isstring]);
            }).to.throw('missing arguments');
        });

        it('throw not array', function () {
            expect(function () {
                args = buildArguments(1224, '');
                validate(args, '');
            }).to.throw('missing arguments');
        });

        it('throw not params and not array', function () {
            expect(function () {
                validate({}, '');
            }).to.throw('missing arguments');
        });

        it('throw null args', function () {
            expect(function () {
                validate(null, '');
            }).to.throw('missing arguments');
        });

        it('throw null validators', function () {
            expect(function () {
                args = buildArguments(1224, '');
                validate(args, null);
            }).to.throw('missing arguments');
        });

        it('returns true optionals arguments', function () {
            args = buildArguments(1224, '');
            result = validate(args, []);
            expect(result).to.be.true;
        });

        it('returns false less arguments more validators', function () {
            args = buildArguments(); // no arguments
            result = validate(args, [isstring]);
            expect(result).to.be.false;
        });

        it('returns false less arguments more validators', function () {
            args = buildArguments(123); // no arguments
            result = validate(args, [isstring, isstring]);
            expect(result).to.be.false;
        });

        describe('strings arguments', function () {
            it('returns false not string', function () {
                args = buildArguments(1224, '');
                result = validate(args, [isstring, isstring]);
                expect(result).to.be.false;
            });
            it('returns false empty string', function () {
                args = buildArguments('no empty', '    ');
                result = validate(args, [isstring, isstring]);
                expect(result).to.be.false;
            });
            it('returns true 0 arg', function () {
                args = buildArguments();
                result = validate(args);
                expect(result).to.be.true;
            });
            it('returns true 1 arg', function () {
                args = buildArguments('not empty');
                result = validate(args, [isstring]);
                expect(result).to.be.true;
            });
            it('returns true 2 arg', function () {
                args = buildArguments('not empty', 'not empty');
                result = validate(args, [isstring, isstring]);
                expect(result).to.be.true;
            });
        });

    });

}());
