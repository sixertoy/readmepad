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

            $scope.projects = [];

            $scope.initProject = function (data) {
                $scope.project = data;
                $scope.project.items = [];
            };

            $scope.initialize = function () {
                ProjectsService.loadall(ProjectsService.LOADALL_URI)
                    .then(function (data) {
                        if (data.length) {
                            $scope.projects = data;
                        }
                    }, function (err) {});
            };

            $scope.openProject = function (project_uri) {
                ProjectsService.open(ProjectsService.OPEN_URI, project_uri)
                    .then(function (data) {
                        $scope.project.items = data.files;
                    }, function (err) {});
            };

            $scope.removeProject = function (project_uri) {
                ProjectsService.remove(ProjectsService.REMOVE_URI, project_uri)
                    .then(function (data) {}, function (err) {});
            };

            $scope.updateProject = function (project_name) {
                ProjectsService.update(ProjectsService.UDPATE_URI, $scope.project)
                    .then(function (data) {
                        $scope.project.name = project_name;
                        $scope.openProject($scope.project.path);
                    }, function (err) {
                        console.log(err);
                    });
            };

            $scope.createProject = function (project_uri) {
                ProjectsService.create(ProjectsService.CREATE_URI, project_uri)
                    .then(function (data) {
                        $scope.initProject(data);
                        $scope.projects.push(data);
                        $scope.openModalRenameProject();
                    }, function (err) {
                        console.log(err);
                    });
            };

            $scope.removeProject = function (project_uri) {
                // console.log(project_uri);
            };

            $scope.openModalRenameProject = function () {
                modalInstance = $modal.open({
                    animation: true,
                    templateUrl: 'RenameProjectModal.html',
                    controller: 'RenameProjectModalController',
                    resolve: {
                        project_name: function () {
                            return $scope.project.name;
                        }
                    }
                }).result.then(function (project_name) {
                    $scope.updateProject(project_name);
                }, function () {});
            };

            $scope.openModalNewProject = function () {
                modalInstance = $modal.open({
                    animation: true,
                    templateUrl: 'NewProjectModal.html',
                    controller: 'NewProjectModalController'
                }).result.then(function (project_uri) {
                    $scope.createProject(project_uri);
                }, function () {});
            };

        }]);

}());
