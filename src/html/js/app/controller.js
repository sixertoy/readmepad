/*jslint indent:4 */
/*globals angular */
(function () {

    'use strict';

    var defaults = {
            sidebarVisible: true,
            cheatsheetVisible: false,
        },
        rootDefaults = {
            isLoading: '',
            theme: 'classic',
            hasCheatsheet: '',
            hasSidebar: 'has-sidebar'
        };

    angular.module('readmepadApp')
        .controller('AppController', ['$scope', '$rootScope', '$log', 'lodash', function ($scope, $rootScope, $log, lodash) {

            $scope.initialize = function () {
                lodash.assign($scope, defaults);
                lodash.assign($rootScope, rootDefaults);
            }

            $scope.showSidebar = function () {
                $scope.sidebarVisible = !$scope.sidebarVisible;
                $rootScope.hasSidebar = $scope.sidebarVisible ? 'has-sidebar' : '';
            };

            $scope.showCheatsheet = function () {
                $scope.cheatsheetVisible = !$scope.cheatsheetVisible;
                $rootScope.hasCheatsheet = $scope.cheatsheetVisible ? 'has-cheatsheet' : '';
            };

            /* **********************************************
             *
             * Loading bar
             * @see https://github.com/chieffancypants/angular-loading-bar#events
             *
             */
            $rootScope.$on('cfpLoadingBar:loading', function () {
                $rootScope.isLoading = 'barloader-isloading';
            });
            $rootScope.$on('cfpLoadingBar:loaded', function () {
                $rootScope.isLoading = 'barloader-isloaded';
            });
            $rootScope.$on('cfpLoadingBar:started', function () {
                $rootScope.isLoading = 'barloader-isstarted';
            });
            $rootScope.$on('cfpLoadingBar:completed', function () {
                $rootScope.isLoading = 'barloader-iscompleted';
            });

        }]);

}());
