/*jslint indent:4 */
/*globals angular */
(function () {

    'use strict';

    var defaults = {
        document: false,
        editMode: false
    };

    angular.module('readmepadAppViewer')
        .config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
            $stateProvider
                .state('document', {
                    url: '/document/:id',
                    views: {
                        editor: {
                            controller: 'EditorController',
                            templateUrl: 'viewer/editor.html'
                        }
                    }
                });
            $urlRouterProvider.otherwise('/');
        }]);

}());
