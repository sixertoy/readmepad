/*jslint indent:4 */
/*globals angular */
(function () {

    'use strict';

    angular.module('readmepadAppSidebar', [])
        .controller('ViewerController', ['$scope', function ($scope) {

            $scope.editMode = false;

            $scope.changeEditMode = function () {
                $scope.editMode = !$scope.editMode;
            };

        }]);

}());
