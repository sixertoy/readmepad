/*jslint indent: 4 */
/*globals angular */
(function () {

    'use strict';

    angular.module('readmepadAppSidebar')
        .factory('ProjectsService', ['$sce', '$q', '$http', 'MarkdownIt', function ($sce, $q, $http, MarkdownIt) {

            var deferred,
                params = {};

            function call(method, uri, params) {
                deferred = $q.defer();
                $http[method](uri, params)
                    .success(function (data, status) {
                        // @TODO log errors
                        if (status === 200) {
                            return deferred.resolve(data);
                        } else {
                            return deferred.reject('error');
                        }
                    })
                    .error(function () {
                        return deferred.reject('error');
                    });
                return deferred.promise;
            }

            return {

                LOAD_URI: '/load',
                OPEN_URI: '/open',
                VIEW_URI: '/view',
                CREATE_URI: '/create',


                /**
                 * Charge les pages d'un projet
                 *
                 * @param [String] uri:self.OPEN_URI
                 *
                 */
                open: function (uri, project_uri) {
                    params = {
                        path: project_uri
                    };
                    return call('post', uri, params);
                },

                /**
                 * Chargement de la liste des projets
                 *
                 * @param [String] uri:self.LOAD_URI
                 *
                 */
                load: function (uri) {
                    params = {};
                    return call('get', uri, params);
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
                    params = {
                        path: project_uri
                    };
                    return call('post', uri, params);
                },

                /**
                 *
                 * Chargement du contenu d'un fichier
                 *
                 * @param [String] uri:self.CREATE_URI
                 * @param [String] project_uri
                 *
                 */
                view: function (uri, project_uri) {
                    params = {
                        path: project_uri
                    };
                    return call('post', uri, params);
                }
            };

        }]);
}());
