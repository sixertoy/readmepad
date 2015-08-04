/*jslint indent:4 */
/*globals angular */
(function () {

    'use strict';

    angular.module('readmepadAppSidebar')
        .controller('NewProjectModalController', ['$scope', '$modalInstance', function ($scope, $modalInstance) {

            $scope.data = {
                project_uri: '',
                project_name: ''
            };

            $scope.onModalSubmit = function () {
                if ($scope.data.project_uri !== '') {
                    $modalInstance.close($scope.data.project_uri, $scope.data.project_name);
                }
            };

            $scope.onModalCancel = function () {
                $modalInstance.dismiss('cancel');
            };

        }]);

}());
