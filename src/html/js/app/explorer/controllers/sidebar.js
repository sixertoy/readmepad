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
        .controller('SidebarController', ['$scope', '$http', '$modal', 'ProjectsService', '_', function ($scope, $http, $modal, ProjectsService, _) {

            _.assign($scope, options);

            $scope.loadProjects = function () {
                ProjectsService.loadProjects()
                    .then(function (data) {
                        // console.log(data);
                    }, function (err) {
                        // console.log(err);
                    });
            };

            $scope.openProject = function (key) {
                /*
                $scope.project = {};
                $scope.project.name = key;
                $scope.project.items = $scope.projects[key];
                */
            };

            $scope.createProject = function (path) {
                ProjectsService.createProjects(path)
                    .then(function (data) {
                        // console.log(data);
                    }, function (err) {
                        // console.log(err);
                    });
                console.log(path);
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
                        animation: true,
                        templateUrl: 'SidebarModal.html',
                        controller: 'SidebarModalController'
                    })
                    .result.then($scope.createProject, function () {
                        // $log.info('Modal dismissed at: ' + new Date());
                    });

            };

        }]);

}());
