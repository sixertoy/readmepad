/*jslint indent: 4 */
/*globals angular */
(function () {

    'use strict';

    angular.module('servicesApp', ['ngSanitize', 'MarkdownIt'])
        .factory('MarkdownService', ['$sce', 'MarkdownIt', function ($sce, MarkdownIt) {
            return {
                raw: '',
                html: '',
                parse: function (value) {
                    this.raw = value;
                    this.setHTML(value);
                },
                getRaw: function () {
                    return this.raw;
                },
                getHTML: function () {
                    return this.html;
                },
                setHTML: function (value) {
                    this.html = $sce.trustAsHtml(MarkdownIt.render(value));
                }
            };
        }]);

}());
