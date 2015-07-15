/*jshint unused: false */
/*jslint indent: 4 */
/*global jasmine, process, require, define, describe, xdescribe, it, xit, expect, beforeEach, afterEach, afterLast */
(function () {

    'use strict';

    var result, helper,
        cwd = process.cwd(),
        Path = require('path'),
        Explorer = require(Path.join(cwd, 'src', 'server', 'lib', 'explorer'));

    describe('Explorer', function () {

        describe('Method', function () {

            xit('Expect something', function(){
                expect(function(){
                    result = helper.render();
                }).toThrow();
            });

        });

    });

}());
