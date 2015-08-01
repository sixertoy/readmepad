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
                        switch (status) {
                        case 200:
                        case 204:
                            return deferred.resolve(data);
                            break;
                        case 400:
                        case 500:
                        default:
                            return deferred.reject('error');
                            break;

                        }
                    })
                    .error(function () {
                        return deferred.reject('error');
                    });
                return deferred.promise;
            }

            return {

                VIEW_URI: '/view',
                OPEN_URI: '/project/open',
                REMOVE_URI: '/project/delete',
                CREATE_URI: '/project/create',
                LOADALL_URI: '/project/loadall',


                /**
                 * Charge les pages d'un projet
                 *
                 * @param [String] uri:self.OPEN_URI
                 *
                 */
                open: function (uri, project_uri) {
                    params = {
                        project_path: project_uri
                    };
                    return call('get', uri, params);
                },

                /**
                 * Chargement de la liste des projets
                 *
                 * @param [String] uri:self.LOAD_URI
                 *
                 */
                loadall: function (uri) {
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
                        project_path: project_uri
                    };
                    return call('post', uri, params);
                },

                /**
                 *
                 * Creation d'un projest
                 *
                 * @param [String] uri:self.REMOVE_URI
                 * @param [String] project_uri
                 *
                 */
                remove: function (uri, project_uri) {
                    params = {
                        project_path: project_uri
                    };
                    return call('delete', uri, params);
                }
            };

        }]);
}());
