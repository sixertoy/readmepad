/*jslint indent: 4, nomen: true, plusplus: true */
/*globals angular, window, lodash, markdownit, _ */
(function () {

    'use strict';

    var dependencies = [
        'readmepadAppViewer',
        'readmepadAppSidebar',
        'readmepadAppToolbar',
        'readmepadAppCheatsheet',
        // third party
        'ngAnimate',
        'angular-loading-bar'
    ];

    angular.module('readmepadApp', dependencies)
        .constant('lodash', _)
        .constant('markdownit', markdownit)
        .run(function () {});

}());
