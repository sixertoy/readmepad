/*jslint indent: 4 */
/*globals angular */
(function () {

    'use strict';

    var markdownIt = angular.module('markdownIt', [])
        .factory('markdownIt', function () {
            return window.markdownit();
        });

    angular.module('readmepadApp', ['explorerApp', 'viewerApp'])
        .run(function () {});

}());
