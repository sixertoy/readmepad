/*jslint indent: 4, nomen: true, plusplus: true */
/*globals angular, window, lodash, markdownit, _ */
(function () {

    'use strict';

    angular.module('readmepadApp', ['readmepadAppSidebar', 'readmepadAppViewer', 'readmepadAppToolbar', 'readmepadAppCheatsheet'])
        .constant('lodash', _)
        .constant('markdownit', markdownit)
        .run(function () {});

}());
