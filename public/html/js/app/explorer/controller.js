/*jslint indent:4 */
/*globals angular */
(function () {

    'use strict';

    angular.module('explorerApp', ['servicesApp'])
        .controller('ExplorerController', ['$scope', '$http', 'MarkdownService', function ($scope, $http, MarkdownService) {
            $http.get('/explorer')
                .success(function (data, status) {
                    if (status === 200) {
                        $scope.projects = data;
                    }
                    /*
                    else {
                        // @TODO log errors
                    }
                    */
                });
            // @TODO log errors
            /*
            .error(function () {
            });
            */

            $scope.addProject = function () {

            };

            $scope.showPage = function (path) {
                $http.post('/view', {
                        path: path
                    })
                    .success(function (data, status) {
                        if (status === 200) {
                            MarkdownService.parse(data);
                        }
                        /*
                        else {
                            // @TODO log errors
                        }
                        */
                    });
                // @TODO log errors
                /*
                .error(function () {
                });
                */
            };

        }]);

}());
