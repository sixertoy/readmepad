/*jshint unused: false */
/*jslint indent: 4, nomen: true */
/*global __dirname, jasmine, process, require, define, describe, xdescribe, it, xit, expect, beforeEach, afterEach, afterLast, console, module, inject */
(function () {

    'use strict';

    var dbname = 'angular';

    describe('SidebarController', function () {

        beforeEach(module('app'));

        var $controller;

        console.log($controller);

        beforeEach(inject(function (_$controller_) {
            // The injector unwraps the underscores (_) from around the parameter names when matching
            $controller = _$controller_;
        }));

        describe('initProject', function () {
            it('set scope.project as data', function () {
                var $scope = {},
                    data = {
                        _id: 'id_form_nedb',
                        name: 'project_name',
                        path: '/fullpath/to/project',
                        project_id: 'md5(project.path)'
                    },
                    controller = $controller('SidebarController', {
                        $scope: $scope
                    });
                $scope.project = [];
                $scope.initProject(data);
                data.items = [];
                expect($scope.project).toEqual(data);
            });
        });

    });

}());
