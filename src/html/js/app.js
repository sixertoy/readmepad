/*jslint indent: 4 */
/*globals angular, window */
(function () {

    'use strict';

    // Markdown Module
    /*
    angular.module('isuri', [])
        .factory('isuri', function () {
            return window.markdownit();
        });
        */

    console.log(window.isuri);

    angular.module('markdownIt', [])
        .factory('MarkdownIt', function () {
            return window.markdownit();
        });

    angular.module('lodash', [])
        .factory('_', function () {
            return window._;
        });

    angular.module('readmepadApp', ['readmepadAppSidebar'])
        .run(function () {});

}());
