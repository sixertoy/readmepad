/*jslint indent:4, nomen: true */
/*globals angular, console */
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
        .controller('SidebarController', ['$scope', '$http', '$modal', 'ProjectsService', '_', function ($scope, $http, $modal, ProjectsService, _) {

            _.assign($scope, options);

            function hydrateProject(data) {
                $scope.project = {};
                $scope.project.name = data.name;
                $scope.project.items = data.items;
            }

            $scope.initialize = function () {
                ProjectsService.loadall(ProjectsService.LOADALL_URI)
                    .then(function (data) {
                        console.log(data.length);
                        console.log(data);
                        if (data.length) {
                            // $scope.projects = data;
                        }
                    }, function (err) {
                        // console.log(err);
                    });
            };

            $scope.openProject = function (project_uri) {
                ProjectsService.open(ProjectsService.OPEN_URI, project_uri)
                    .then(function (data) {
                        hydrateProject(data);
                    }, function (err) {
                        // console.log(err);
                    });
            };

            $scope.removeProject = function (project_uri) {
                ProjectsService.remove(ProjectsService.REMOVE_URI, project_uri)
                    .then(function (data) {
                        hydrateProject(data);
                    }, function (err) {
                        // console.log(err);
                    });
            };

            $scope.createProject = function (project_uri) {
                ProjectsService.create(ProjectsService.CREATE_URI, project_uri)
                    .then(function (data) {
                        // console.log('project has been created');
                        if (!$scope.projects) {
                            $scope.projects = [];
                        }
                        $scope.projects.push(data);
                        hydrateProject(data);
                    }, function (err) {
                        // console.log('$scope.createProject :: err');
                        console.log(err);
                    });
            };

            $scope.removeProject = function (project_uri) {
                // console.log(project_uri);
            };

            $scope.openModalProject = function () {
                modalInstance = $modal.open({
                    animation: true,
                    templateUrl: 'SidebarModal.html',
                    controller: 'SidebarModalController'
                }).result.then(function (project_uri) {
                    // console.log('result modal');
                    $scope.createProject(project_uri);
                }, function () {
                    // $log.info('Modal dismissed at: ' + new Date());
                });
            };

        }]);

}());
