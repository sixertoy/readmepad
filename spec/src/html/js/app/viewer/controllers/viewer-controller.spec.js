/*jshint unused: false */
/*jslint indent: 4, nomen: true */
/*global __dirname, jasmine, describe, xdescribe, it, xit, expect, beforeEach, afterEach, afterLast, console, module, inject */
(function () {

    'use strict';

    var $scope, $controller;

    describe('ViewerController', function () {

        beforeEach(module('readmepadAppSidebar'));

        beforeEach(inject(function (_$controller_, $rootScope) {
            $scope = $rootScope.$new();
            $controller = _$controller_;
            $controller('ViewerController', {
                $scope: $scope
            });
        }));

        describe('changeEditMode', function () {
            it('set scope.editMode to true', function () {
                $scope.editMode = false;
                $scope.changeEditMode();
                expect($scope.editMode).toEqual(true);
            });
            it('set scope.editMode to false', function () {
                $scope.editMode = true;
                $scope.changeEditMode();
                expect($scope.editMode).toEqual(false);
            });
        });

    });

}());
