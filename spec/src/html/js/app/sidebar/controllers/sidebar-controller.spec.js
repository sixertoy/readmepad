/*jshint unused: false */
/*jslint indent: 4, nomen: true */
/*global __dirname, jasmine, process, require, define, describe, xdescribe, it, xit, expect, beforeEach, afterEach, afterLast, console, module, inject */
(function () {

    'use strict';

    var cwd = process.cwd(),
        path = require('path'),
        dbfile = path.join(cwd, 'spec', 'fixtures', 'nedb', 'angular.nedb');

    describe('SidebarController', function () {

        beforeEach(module('readmepadApp'));

        var $controller;

        beforeEach(inject(function (_$controller_) {
            // The injector unwraps the underscores (_) from around the parameter names when matching
            $controller = _$controller_;
        }));

    });

}());
