/*jslint indent:4 */
/*globals angular */
(function () {

    'use strict';

    angular.module('readmepadApp')
        .controller('AppController', ['$scope', '$rootScope', function ($scope, $rootScope) {

            $scope.sidebarVisible = true;
            $scope.sidebarCheatsheet = false;

            $scope.showSidebar = function () {
                $scope.sidebarVisible = !$scope.sidebarVisible;
                $rootScope.hasSidebar = $scope.sidebarVisible ? 'has-sidebar' : '';
            };

            $scope.showCheatsheet = function () {
                $scope.sidebarCheatsheet = !$scope.sidebarCheatsheet;
                $rootScope.hasCheatsheet = $scope.sidebarCheatsheet ? 'has-cheatsheet' : '';
            };

            $scope.initialize = function(){
                $rootScope.theme = 'classi';
                $rootScope.hasCheatsheet = '';
                $rootScope.hasSidebar = 'has-sidebar';
            }

        }]);

}());
