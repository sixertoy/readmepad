/*jslint indent:4 */
/*globals angular */
(function () {

    'use strict';

    angular.module('readmepadAppCheatsheet')
        .controller('CheatsheetController', ['$scope', '$rootScope', function ($scope, $rootScope) {

            $scope.initialize = function () {
                // a l'init du controller
                // on ecoute les changements
                // sur la variable cheatsheetVisible du parent
                // on reconstruit alors la scrollbar
                $scope.$parent.$watch('cheatsheetVisible', function () {
                    setTimeout(function () {
                        $scope.$broadcast('rebuild:cheatsheet');
                    }, 300);
                });
            };

        }]);
}());
