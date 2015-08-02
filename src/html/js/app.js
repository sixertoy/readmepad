/*jslint indent: 4 */
/*globals angular, window, lodash, markdownit */
(function () {

    'use strict';

    angular.module('readmepadApp', ['readmepadAppSidebar', 'readmepadAppViewer'])
        .constant('lodash', _)
        .constant('markdownit', markdownit)
        .run(function () {});

}());
