/*jslint indent: 4 */
/*globals angular, window */
(function () {

    'use strict';

    // Markdown Module
    angular.module('MarkdownIt', [])
        .factory('MarkdownIt', function () {
            return window.markdownit();
        });

    angular.module('readmepadApp', ['explorerApp', 'viewerApp', 'servicesApp'])
        .run(function () {});

}());
