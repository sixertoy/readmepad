/*jslint indent:4, nomen: true */
/*globals angular, console */
(function () {

    'use strict';

    var modalInstance,
        defaults = {
            projects: false,
            current: {
                files: null,
                name: 'Ouvrir un projet...'
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

            $scope.initialize = function () {
                lodash.assign($scope, defaults);
                $scope.loadAll();
            };

            $scope.openProjectSubfolder = function (document) {
                if (!document.hasOwnProperty('active')) {
                    document.active = false;
                }
                document.active = !document.active;
                $scope.$broadcast('rebuild:me'); // scrollbar broadcast
            };

            $scope.openProject = function (project) {
                ProjectsService.open(ProjectsService.OPEN_URI, project)
                    .then(function (data) {
                        $scope.current = project;
                        $scope.current.files = data.files;
                        $scope.$broadcast('rebuild:me');
                    }, function (err) {});
            };

            $scope.loadAll = function(){
                ProjectsService.loadall(ProjectsService.LOADALL_URI)
                    .then(function (projects) {
                        $scope.projects = projects;
                    }, function (err) {});
            };

            $scope.removeProject = function (index) {
                /*
                ProjectsService.remove(ProjectsService.REMOVE_URI, index)
                    .then(function (projects) {
                        console.log(data);
                    }, function (err) {});
                    */
            };

            $scope.updateProject = function (project_name) {
                ProjectsService.update(ProjectsService.UDPATE_URI, $scope.project)
                    .then(function (project) {
                        /*
                        $scope.project.name = project_name;
                        $scope.openProject($scope.project.path);
                        */
                    }, function (err) {
                        $log.error(err);
                    });
            };

            /**
             *
             * Creation d'un nouveau projet
             *
             */
            $scope.createProject = function () {
                ProjectsService.create(ProjectsService.CREATE_URI, $scope.projectForm)
                    .then(function (result) {
                        // reinit du modal form
                        // de creation d'un projet
                        $scope.projectForm = {
                            name: '',
                            uri: null
                        };
                        // mise a jour de la liste des projets
                        if(result.projects){
                            // si le projet n'existe pas dans la liste
                            // on met a jour la liste des projets
                            $scope.projects = result.projects;
                        }
                        // on ouvre les fichiers du nouveau projet
                        $scope.openProject(result.project);
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
