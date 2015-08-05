/*jslint indent:4 */
/*globals angular */
(function () {

    'use strict';

    angular.module('readmepadAppViewer')
        .controller('ViewerController', ['$scope', function ($scope) {

            $scope.editMode = false;

            $scope.tabs = [
                {titre: 'tab1'},
                {titre: 'tab2'}
            ];

            $scope.changeEditMode = function () {
                $scope.editMode = !$scope.editMode;
            };

            $scope.initialize = function () {

            };

        }]);

}());
