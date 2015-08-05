/*jslint indent:4 */
/*globals angular */
(function () {

    'use strict';

    var defaults = {
        document: false,
        editMode: false
    };

    angular.module('readmepadAppViewer')
        .controller('ViewerController', ['$scope', 'lodash', function ($scope, lodash) {

            $scope.initialize = function () {
                lodash.assign($scope, defaults);
            };

        }]);

}());
