/*jslint indent:4, nomen: true */
/*globals angular */
(function () {

    'use strict';

    angular.module('readmepadAppViewer', ['ui.router', 'base64'])
        .config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
            $urlRouterProvider.otherwise('/');
            /*
            $stateProvider
                .state('document/view', {
                    url: '/document/view/:content'
                });
                */
//            $locationProvider.html5Mode(true);
        }])
        .run(function () {});

}());
