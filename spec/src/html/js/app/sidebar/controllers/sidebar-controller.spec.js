/*jshint unused: false */
/*jslint indent: 4, nomen: true */
/*global __dirname, jasmine, describe, xdescribe, it, xit, expect, beforeEach, afterEach, afterLast, console, module, inject */
(function () {

    'use strict';

    var $scope, $controller, $rootScope;

    describe('SidebarController', function () {

        beforeEach(function () {
            module('readmepadApp');
            module('readmepadAppSidebar');
            inject(function ($injector) {
                $rootScope = $injector.get('$rootScope');
                $scope = $rootScope.$new();
                //
                $controller = $injector.get('$controller');
                $controller('SidebarController', {
                    $scope: $scope
                });
            });
        });

        describe('$scope.projects', function () {
            it('returns false by defaults lodash.assign', function () {
                expect($scope.projects).toEqual(false);
            });
        });

        describe('initProject', function () {
            it('assign project to $scope.project', function () {
                var data = {
                    name: 'mocked',
                    path: 'path/to/mocked/project'
                };
                $scope.initProject(data);
                expect($scope.project).toEqual(data);
                expect($scope.project.items).toEqual([]);
            });
        });

    });
}());
