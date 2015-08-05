/*jslint indent:4 */
/*globals angular */
(function () {

    'use strict';

    angular.module('readmepadAppViewer')
        .controller('EditorController', ['$scope', '$http', 'document', function ($scope, $http, document) {

            console.log($http);

        }])
        .config(['$stateProvider', '$urlRouterProvider', '$base64', function ($stateProvider, $urlRouterProvider, $base64) {
            $stateProvider
                .state('document', {
                    url: '/document/:id',
                    controller: 'EditorController',
                    templateUrl: 'viewer/editor.html',
                    resolve: {
                        document: function ($stateParams) {
                            return $base64.decode(decodeURIComponent($stateParams.id));
                        }
                    }
                });
            $urlRouterProvider.otherwise('/');
        }]);

}());
