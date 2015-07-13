/*jslint indent:4 */
/*globals angular */
(function () {

    'use strict';

    angular.module('explorerApp', ['ui.bootstrap', 'servicesApp'])
        .controller('ExplorerController', ['$scope', '$http', '$modal', 'MarkdownService', '$log', function ($scope, $http, $modal, MarkdownService, $log) {

            $http.get('/explorer')
                .success(function (data, status) {
                    if (status === 200) {
                        $scope.projects = data;
                    }
                    /*
                    else {
                        // @TODO log errors
                    }
                    */
                });
            // @TODO log errors
            /*
            .error(function () {
            });
            */

            $scope.showPage = function (path) {
                $http.post('/view', {
                    path: path
                }).success(function (data, status) {
                    if (status === 200) {
                        MarkdownService.parse(data);
                    }
                    /*
                    else {
                        // @TODO log errors
                    }
                    */
                });
                // @TODO log errors
                /*
                .error(function () {
                });
                */
            };

            $scope.addProject = function (size) {
                var modalInstance = $modal.open({
                    size: size,
                    resolve: {},
                    animation: true,
                    controller: 'ModalInstanceCtrl',
                    templateUrl: 'js/app/explorer/_modal.html'
                });

                modalInstance.result.then(function (selectedItem) {
                    $log.info(selectedItem);
                    // $scope.selected = selectedItem;
                }, function () {
                    $log.info('Modal dismissed at: ' + new Date());
                });

            };

        }]).controller('ModalInstanceCtrl', ['$scope', '$modalInstance', function ($scope, $modalInstance) {
            $scope.ok = function () {
                $modalInstance.close('yo');
            };
            $scope.cancel = function () {
                $modalInstance.dismiss('cancel');
            };
        }]);

}());
