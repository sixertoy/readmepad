/*jslint indent:4 */
/*globals angular */
(function () {

    'use strict';

    angular.module('readmepadAppCheatsheet')
        .controller('CheatsheetController', ['$scope', '$rootScope', function ($scope, $rootScope) {

            $scope.cheatsheetVisible = $scope.$parent.cheatsheetVisible;

            $scope.initialize = function(){
//                $scope.$watch($scope.$parent.cheatsheetVisible, function() {
//                    $scope.$broadcast('rebuild:cheatsheet');
//                });
            };

        }]);

}());
