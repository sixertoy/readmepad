/*jslint indent: 4 */
/*globals angular */
(function () {

    'use strict';

    angular.module('readmepadAppSidebar')
        .factory('ProjectsService', ['$sce', '$q', '$http', 'MarkdownIt', function ($sce, $q, $http, MarkdownIt) {

            var deferred,
                params = {};

            return {

                LOAD_URI: '/explorer',
                CREATE_URI: '/create',

                /**
                 * Chargement de la liste des projest
                 *
                 * @param [String] uri:self.LOAD_URI
                 *
                 */
                load: function (uri) {
                    deferred = $q.defer();
                    $http.get(uri)
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
                            console.log(arguments);
                            return deferred.reject('error');
                        });
                    return deferred.promise;
                },

                /**
                 *
                 * Creation d'un projest
                 *
                 * @param [String] uri:self.CREATE_URI
                 * @param [String] project_uri
                 *
                 */
                create: function (uri, project_uri) {
                    params.path = project_uri;
                    //
                    deferred = $q.defer();
                    $http.post(uri, params).success(function (data, status) {
                        // @TODO log errors
                        if (status === 200) {
                            // $scope.projects = data;
                            return deferred.resolve(data);
                        } else {
                            console.log(arguments);
                            return deferred.reject('error');
                        }
                    }).error(function () {
                        console.log(arguments);
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
