/*jslint indent: 4 */
/*globals angular */
(function () {

    'use strict';

    angular.module('servicesApp', ['ngSanitize', 'MarkdownIt'])
        .factory('MarkdownService', ['$sce', 'MarkdownIt', function ($sce, MarkdownIt) {
            var raw = '',
                html = '';
            return {
                setRaw: function (value) {
                    raw = value;
                },
                getRaw: function () {
                    return raw;
                },
                getHTML: function () {
                    var content = MarkdownIt.render(raw);
                    return $sce.trustAsHtml(content);
                }
            };
        }]);

}());
