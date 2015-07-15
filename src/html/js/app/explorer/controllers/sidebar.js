/*jslint indent:4, nomen: true */
/*globals angular */
(function () {

    'use strict';

    var modalInstance,
        options = {
            projects: false,
            project: {
                items: [],
                name: 'Ouvrir un dossier...'
            }
        };

    /**
     *
     * Declaration du module
     *
     *
     */
    angular.module('readmepadAppSidebar')
        .controller('SidebarController', ['$scope', '$http', '$modal', '_', function ($scope, $http, $modal, _) {

            _.assign($scope, options);

            $scope.loadProjects = function () {
                console.log('load projects');
                /*
                $http.get('/explorer')
                    .success(function (data, status) {
                        // @TODO log errors
                        if (status === 200) {
                            $scope.projects = data;
                        }
                    })
                    .error(function () {});
                    */
            };

            $scope.openProject = function (key) {
                /*
                $scope.project = {};
                $scope.project.name = key;
                $scope.project.items = $scope.projects[key];
                */
            };

            $scope.removeProject = function (key) {
                // $log.info(key);
            };

            $scope.showPage = function (path) {
                /*
                $http.post('/view', {
                    path: path
                }).success(function (data, status) {
                    if (status === 200) {
                        // MarkdownService.parse(data);
                    }
                });
                */
            };

            $scope.openModalProject = function () {


                modalInstance = $modal.open({
                        resolve: {},
                        animation: true,
                        templateUrl: 'SidebarModal.html',
                        controller: 'SidebarModalController'
                    })
                    .result.then(function (path) {
                        // $log.info(path);
                        // $scope.selected = selectedItem;
                    }, function () {
                        // $log.info('Modal dismissed at: ' + new Date());
                    });

            };

        }]);

}());
