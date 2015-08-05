/*jslint indent:4 */
/*globals angular */
(function () {

    'use strict';

    var defaults = {
        document: false,
        editMode: false
    };

    angular.module('readmepadAppViewer')
        .config(['$stateProvider', '$urlRouterProvider', '$base64', function ($stateProvider, $urlRouterProvider, $base64) {
            $stateProvider
                .state('document', {
                    url: '/document/:id',
                    views: {
                        editor: {
                            controller: 'EditorController',
                            templateUrl: 'viewer/editor.html',
                            resolve: {
                                document: function ($http, $stateParams) {
                                    return $base64.decode(decodeURIComponent($stateParams.id));
                                }
                            }
                        }
                    }
                });
            $urlRouterProvider.otherwise('/');
        }])
        .controller('ViewerController', ['$scope', 'lodash', function ($scope, lodash) {

            $scope.initialize = function () {
                lodash.assign($scope, defaults);
            };

        }]);

}());
