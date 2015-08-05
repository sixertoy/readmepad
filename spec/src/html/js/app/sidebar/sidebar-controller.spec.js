/*jshint unused: false */
/*jslint indent: 4, nomen: true */
/*global __dirname, jasmine, describe, xdescribe, it, xit, expect, beforeEach, afterEach, afterLast, console, module, inject, sinon */
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
            sinon.stub($scope, 'loadAll');
            $scope.initialize();
        });

        afterEach(function(){
            $scope.loadAll.restore();
        });

        describe('$scope.projects', function () {
            it('returns false by defaults lodash.assign', function () {
                expect($scope.projects).toEqual(false);
            });
        });

        describe('Assign projects to $scope.projects', function () {
            it('returns false', function () {
                var projects = [];
                $scope.setProjectsList(projects);
                expect($scope.projects).toEqual(false);
                projects = null;
                $scope.setProjectsList(projects);
                expect($scope.projects).toEqual(false);
                projects = false;
                $scope.setProjectsList(projects);
                expect($scope.projects).toEqual(false);
                projects = {};
                $scope.setProjectsList(projects);
                expect($scope.projects).toEqual(false);
                projects = 123;
                $scope.setProjectsList(projects);
                expect($scope.projects).toEqual(false);
            });
            it('returns list', function () {
                var projects = ['toto', 'titi', 'tutu'];
                $scope.setProjectsList(projects);
                expect($scope.projects).toEqual(projects);
            });
        });

    });
}());
