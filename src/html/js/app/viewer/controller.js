/*jslint indent:4 */
/*globals angular */
(function () {

    'use strict';

    angular.module('viewerApp', ['servicesApp'])
        .controller('ViewerController', ['$scope', 'MarkdownService', function ($scope, MarkdownService) {

            $scope.edit = false;

            $scope.changeEditMode = function () {
                $scope.edit = !$scope.edit;
            };

            $scope.markdownSrv = MarkdownService;

        }]);

}());
