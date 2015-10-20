/*jslint indent:4 */
/*globals angular */
(function () {

    'use strict';

    angular.module('readmepadAppToolbar')
        .controller('PreferencesController', ['$scope', '$rootScope', function ($scope, $rootScope) {

            $scope.darktheme = false;
            $rootScope.theme = $scope.darktheme ? 'dark' : 'classic';

            $scope.switchTheme = function () {
                $scope.darktheme = !$scope.darktheme;
                $rootScope.theme = $scope.darktheme ? 'dark' : 'classic';
            };

            $scope.preferencesPopover = {
                theme: $scope.darktheme,
                templateUrl: 'toolbar/preferences.html'
            };

        }]);

}());
