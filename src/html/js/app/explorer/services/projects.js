/*jslint indent: 4 */
/*globals angular */
(function () {

    'use strict';

    angular.module('readmepadAppSidebar')
        .factory('ProjectsService', ['$sce', 'MarkdownIt', function ($sce, MarkdownIt) {
            return {};
            /*
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
            */
        }]);

}());
