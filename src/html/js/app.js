/*jslint indent: 4 */
/*globals angular */
(function () {

    'use strict';

    var markdownIt = angular.module('MarkdownIt', [])
        .factory('MarkdownIt', function () {
            return window.markdownit();
        });

    angular.module('readmepadApp', ['explorerApp', 'viewerApp', 'servicesApp', 'ui.ace'])
        .run(function () {});

}());
