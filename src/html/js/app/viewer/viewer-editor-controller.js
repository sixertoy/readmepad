/*jslint indent:4 */
/*globals angular */
(function () {

    'use strict';

    angular.module('readmepadAppViewer')
        .controller('EditorController', ['$scope', 'document', function ($scope, document) {


            $scope.document = document;
            console.log($scope.document);

        }]);

}());
