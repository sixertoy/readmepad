/*jslint indent:4 */
/*globals angular */
(function () {

    'use strict';

    angular.module('viewerApp', ['servicesApp', 'ui.ace'])
        .controller('ViewerController', ['$scope', '$http', 'MarkdownService', function ($scope, $http, MarkdownService) {

            $scope.edit = false;

            $scope.changeEditMode = function () {
                $scope.edit = !$scope.edit;
            };

            $scope.saveDocumentChanges = function () {
                $http.post('/save', {
                        content: $scope.markdownSrv.raw
                    })
                    .success(function (data, status) {
                        if (status === 200) {
                            console.log('saved');
                            // MarkdownService.parse(data);
                        }
                        /*
                        else {
                            // @TODO log errors
                        }
                        */
                    });
            };

            $scope.aceChanged = function (e) {
                $scope.markdownSrv.setHTML($scope.markdownSrv.raw);
            };

            $scope.markdownSrv = MarkdownService;

        }]);

}());
