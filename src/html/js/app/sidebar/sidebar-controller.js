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
        .controller('SidebarController', ['$scope', '$http', '$log', '$modal', 'lodash', 'ProjectsService', function ($scope, $http, $log, $modal, lodash, ProjectsService) {

            $scope.showFiles = function (obj) {
                if (!obj.hasOwnProperty('active')) {
                    obj.active = false;
                }
                obj.active = !obj.active;
                $scope.$broadcast('rebuild:me'); // scrollbar broadcast
            };

            lodash.assign($scope, options);

            $scope.initProject = function (data) {
                $scope.project = data;
                $scope.project.items = [];
            };

            $scope.initialize = function () {
                ProjectsService.loadall(ProjectsService.LOADALL_URI)
                    .then(function (data) {
                        if (data.length) {
                            //data.sort(sortProjectByName);
                            $scope.projects = data;
                        }
                    }, function (err) {});
            };

            $scope.openProject = function (project_uri) {
                // console.log('updateProject');
                ProjectsService.open(ProjectsService.OPEN_URI, project_uri)
                    .then(function (data) {
                        $scope.project.items = data.files;
                        $scope.$broadcast('rebuild:me'); // scrollbar broadcast
                    }, function (err) {});
            };

            $scope.removeProject = function (index) {
                // console.log('removeProject');
                // console.log(index);
                /*
                ProjectsService.remove(ProjectsService.REMOVE_URI, index)
                    .then(function (data) {
                        console.log(data);
                    }, function (err) {});
                    */
            };

            $scope.updateProject = function (project_name) {
                ProjectsService.update(ProjectsService.UDPATE_URI, $scope.project)
                    .then(function (data) {
                        $scope.project.name = project_name;
                        $scope.openProject($scope.project.path);
                    }, function (err) {
                        $log.error(err);
                    });
            };

            $scope.createProject = function () {
                var list;
                ProjectsService.create(ProjectsService.CREATE_URI, $scope.projectForm)
                    .then(function (data) {
                        if (!$scope.projects) {
                            $scope.projects = [];
                        }
                        $scope.projects.push(data);
                        list = $scope.projects;
                        //list.sort(sortProjectByName);
                        $scope.projects = list;
                        $scope.initProject(data);
                        $scope.projectForm = {
                            name: '',
                            uri: null
                        };
                    }, function (err) {
                        $log.error(err);
                    });
            };

            /**
             *
             * Open modal
             * Import a project
             *
             */
            $scope.projectForm = {
                name: '',
                uri: null
            };
            $scope.openModalNewProject = function () {
                modalInstance = $modal.open({
                    scope: $scope,
                    animation: true,
                    templateUrl: 'NewProjectModal.html',
                    controller: 'NewProjectModalController',
                    resolve: {
                        data: function () {
                            return $scope.projectForm;
                        }
                    }
                }).result.then($scope.createProject, function () {
                    $log.info('import project modal dismissed at: ' + new Date());
                });
            };

        }]);

}());
