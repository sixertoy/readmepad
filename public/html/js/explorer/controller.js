/*jslint indent:4 */
/*globals angular */
(function () {

    'use strict';

    angular.module('explorerApp', ['markdownIt'])
        .controller('ExplorerController', ['$scope', '$http', 'markdownIt', function ($scope, $http, markdownIt) {
            $http.get('/explorer')
                .success(function (data, status, headers, config) {
                    if (status === 200) {
                        $scope.projects = data;
                    }
                }).error(function (data, status, headers, config) {

                });

            $scope.showPage = function (path) {
                $http.post('/view', {path: path})
                    .success(function (data, status, headers, config) {
                        if (status === 200) {
                            var content = markdownIt.render(data);
                            $scope.markdown_content = content;
                        }
                    }).error(function (data, status, headers, config) {
                    });
            };

        }]);

}());
