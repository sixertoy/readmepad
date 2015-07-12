/*jslint indent:4 */
/*globals angular */
(function () {

    'use strict';

    angular.module('viewerApp', ['servicesApp', 'ui.codemirror'])
        .controller('ViewerController', ['$scope', 'MarkdownService', function ($scope, MarkdownService) {

            $scope.edit = false;

            $scope.changeEditMode = function () {
                $scope.edit = !$scope.edit;
            }

            $scope.editorOptions = {
                lineWrapping: true,
                lineNumbers: true,
                readOnly: 'nocursor',
                mode: 'markdown',
            };

            $scope.markdownSrv = MarkdownService;

        }]);

}());
