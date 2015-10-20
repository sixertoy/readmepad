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
        .controller('SidebarTreeController', ['$scope', function ($scope) {
            //
        }])
        .directive('hrefHyperlink', ['$base64', '$state', function ($base64, $state) {
            return {
                restrict: 'AE',
                link: function (scope, element, attrs) {
                    var fullpath = scope.$eval(attrs.hrefHyperlink);
                    fullpath = $state.href('document', {
                        id: encodeURIComponent($base64.encode(fullpath))
                    });
                    element.attr('href', fullpath);
                }
            };

        }]);
}());
