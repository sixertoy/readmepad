/*jslint indent:4, nomen: true */
/*globals angular */
(function () {

    'use strict';

    angular.module('readmepadAppViewer', ['ui.router', 'base64'])
        .config(['$stateProvider', '$urlRouterProvider', '$locationProvider', function ($stateProvider, $urlRouterProvider, $locationProvider) {
            $urlRouterProvider.otherwise('/');
            $stateProvider
                .state('document', {
                    url: '/document/:id',
                    controller: function ($scope, $stateParams) {
                        console.log($stateParams)
                    }
                });
        }])
        .run(function () {});

}());
