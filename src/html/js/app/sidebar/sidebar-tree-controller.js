/*jslint indent:4, nomen: true */
/*globals angular, console */
(function () {

    'use strict';

    /**
     *
     * Declaration du module
     *
     *
     */
    angular.module('readmepadAppSidebar')
        .controller('SidebarTreeController', ['$scope', '$base64', '$urlMatcherFactory', function ($scope, $base64, $urlMatcherFactory) {

            $scope.createDocumentLink = function (path) {
                console.log(path);
                return $urlMatcherFactory.compile('/document/:id').format({
                    id: encodeURIComponent($base64.encode(path))
                });
            };

        }])
        .directive('routelink', [function () {

            return {
                restrict: 'A',
                link: function (scope, element, attrs) {
                    var url = scope.$eval(attrs.routelink);
                    element.attr('href', url);
                }
            };

        }]);
}());
