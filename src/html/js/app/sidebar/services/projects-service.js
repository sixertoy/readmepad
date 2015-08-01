/*jslint indent: 4 */
/*globals angular */
(function () {

    'use strict';

    angular.module('readmepadAppSidebar')
        .factory('ProjectsService', ['$sce', '$q', '$http', 'md5', 'MarkdownIt', function ($sce, $q, $http, md5, MarkdownIt) {

            var deferred,
                params = {};

            function call(method, uri, params) {
                deferred = $q.defer();
                $http[method](uri, params)
                    .success(function (data, status) {
                        // @TODO log errors
                        switch (status) {
                        case 200:
                        case 201:
                            return deferred.resolve(data);
                        case 204: // if project doesn't exists
                        case 400:
                        case 404:
                        case 503:
                            return deferred.reject(status);
                        default:
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
                UDPATE_URI: '/project/update',
                CREATE_URI: '/project/create',
                LOADALL_URI: '/project/loadall',


                /**
                 * Charge les pages d'un projet
                 *
                 * @param [String] uri:self.OPEN_URI
                 *
                 */
                open: function (uri, project_path) {
                    var q = $q.defer();
                    uri += '/' + md5(project_path);
                    call('get', uri).then(function (data) {

                        q.resolve(data);

                    }, function (status) {

                        console.log(status);
                        q.reject(status);

                    });
                    return q.promise;
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
                create: function (uri, project_path) {
                    params = {
                        project_path: project_path
                    };
                    return call('post', uri, params);
                },

                /**
                 *
                 * Mise a jour d'un projest
                 *
                 * @param [String] uri:self.CREATE_URI
                 * @param [String] project_uri
                 *
                 */
                update: function (uri, project) {
                    params = {
                        project: project
                    };
                    return call('put', uri, params);
                },

                /**
                 *
                 * Creation d'un projest
                 *
                 * @param [String] uri:self.REMOVE_URI
                 * @param [String] project_uri
                 *
                 */
                remove: function (uri, project_path) {
                    params = {
                        project_id: md5(project_path)
                    };
                    return call('delete', uri, params);
                }
            };

        }]);
}());
