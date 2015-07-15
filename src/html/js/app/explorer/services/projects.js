/*jslint indent: 4 */
/*globals angular */
(function () {

    'use strict';

    angular.module('readmepadAppSidebar')
        .factory('ProjectsService', ['$sce', '$q', '$http', 'MarkdownIt', function ($sce, $q, $http, MarkdownIt) {

            var deferred,
                params = {};

            return {

                /**
                 *
                 *
                 *
                 */
                loadProjects: function () {
                    deferred = $q.defer();
                    $http.get('/explorer')
                        .success(function (data, status) {
                            // @TODO log errors
                            if (status === 200) {
                                // $scope.projects = data;
                                return deferred.resolve(data);
                            } else {
                                return deferred.reject('error');
                            }
                        })
                        .error(function () {
                            return deferred.reject('error');
                        });
                    return deferred.promise;
                },

                /**
                 *
                 *
                 *
                 */
                createProject: function (path) {
                    params.path = path;
                    //
                    deferred = $q.defer();
                    $http.post('/create', params).success(function (data, status) {
                        // @TODO log errors
                        if (status === 200) {
                            // $scope.projects = data;
                            return deferred.resolve(data);
                        } else {
                            return deferred.reject('error');
                        }
                    }).error(function () {
                        return deferred.reject('error');
                    });
                    return deferred.promise;
                }
            };

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
