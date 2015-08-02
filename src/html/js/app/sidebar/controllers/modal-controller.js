/*jslint indent:4 */
/*globals angular */
(function () {

    'use strict';

    angular.module('readmepadAppSidebar')
        .controller('NewProjectModalController', ['$scope', '$modalInstance', function ($scope, $modalInstance) {

            $scope.data = {
                project_uri: ''
            };

            $scope.onModalSubmit = function () {
                if ($scope.data.project_uri !== '') {
                    $modalInstance.close($scope.data.project_uri);
                }
            };

            $scope.onModalCancel = function () {
                $modalInstance.dismiss('cancel');
            };

        }])
        .controller('RenameProjectModalController', ['$scope', '$modalInstance', 'project_name', function ($scope, $modalInstance, project_name) {

            $scope.data = {
                project_name: project_name
            };

            $scope.onModalSubmit = function () {
                if ($scope.data.project_name !== '') {
                    $modalInstance.close($scope.data.project_name);
                }
            };

            $scope.onModalCancel = function () {
                $modalInstance.dismiss('cancel');
            };

        }]);

}());
