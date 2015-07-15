/*jslint indent:4 */
/*globals angular */
(function () {

    'use strict';

    angular.module('readmepadAppSidebar')
        .controller('SidebarModalController', ['$scope', '$modalInstance', function ($scope, $modalInstance) {

            $scope.onModalSubmit = function () {
                $modalInstance.close();
            };

            $scope.onModalCancel = function () {
                $modalInstance.dismiss('cancel');
            };

        }])

}());
