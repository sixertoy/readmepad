/*jslint indent:4 */
/*globals angular */
(function () {

    'use strict';

    angular.module('readmepadAppSidebar')
        .controller('SidebarModalController', ['$scope', '$modalInstance', function ($scope, $modalInstance) {

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

        }]);

}());
