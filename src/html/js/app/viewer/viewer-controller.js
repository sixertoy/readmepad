/*jslint indent:4 */
/*globals angular */
(function () {

    'use strict';

    angular.module('readmepadAppViewer')
        .controller('ViewerController', ['$scope', function ($scope) {

            $scope.editMode = false;

            $scope.changeEditMode = function () {
                $scope.editMode = !$scope.editMode;
            };

            $scope.initialize = function () {

            };

        }])
        .config(['$stateProvider', '$urlRouterProvider', '$locationProvider', function ($stateProvider, $urlRouterProvider, $locationProvider) {
            $stateProvider
                .state('document', {
                    url: '/document/:id',
                    controller: function ($scope, $stateParams) {
                        console.log($stateParams);
                    }
                });
            $urlRouterProvider.otherwise('/');
        }]);

}());
