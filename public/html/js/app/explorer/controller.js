/*jslint indent:4 */
/*globals angular */
(function () {

    'use strict';

    angular.module('explorerApp', ['servicesApp'])
        .controller('ExplorerController', ['$scope', '$http', 'MarkdownService', function ($scope, $http, MarkdownService) {
            $http.get('/explorer')
                .success(function (data, status, headers, config) {
                    if (status === 200) {
                        $scope.projects = data;
                    }
                }).error(function (data, status, headers, config) {});

            $scope.showPage = function (path) {
                $http.post('/view', {path: path})
                    .success(function (data, status, headers, config) {
                        if (status === 200) {
                            MarkdownService.setRaw(data);
                        }
                    }).error(function (data, status, headers, config) {});
            };

        }]);

}());
