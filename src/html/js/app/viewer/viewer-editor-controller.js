/*jslint indent:4 */
/*globals angular */
(function () {

    'use strict';

    angular.module('readmepadAppViewer')
        .controller('EditorController', ['$scope', '$http', '$base64', 'lodash', '$stateParams', function ($scope, $http, $base64, lodash, $stateParams) {

            if($scope.document){
                console.log('document exists');
            } else {
                console.log('document not exists');
            }
            $scope.document = $base64.decode(decodeURIComponent($stateParams.id));

        }]);

}());
