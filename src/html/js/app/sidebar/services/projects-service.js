/*jslint indent: 4 */
/*globals angular */
(function () {

    'use strict';

    angular.module('readmepadAppSidebar')
        .factory('ProjectsService', ['$sce', '$q', '$http', 'md5', function ($sce, $q, $http, md5) {

            return {

                OPEN_URI: '/project/open',
                REMOVE_URI: '/project/delete',
                UPDATE_URI: '/project/update',
                CREATE_URI: '/project/create',
                LOADALL_URI: '/project/loadall',

                call: function (method, uri, params) {
                    if (arguments.length < 3) {
                        params = {};
                    }
                    var q = $q.defer();
                    $http[method](uri, params)
                        .success(function (data, status) {
                            // @TODO log errors
                            switch (status) {
                            case 200:
                            case 201:
                                return q.resolve(data);
                            case 204: // if project doesn't exists
                            case 400:
                            case 404:
                            case 503:
                                return q.reject(status);
                            default:
                                break;
                            }
                        })
                        .error(function () {
                            return q.reject('error');
                        });
                    return q.promise;
                },


                /**
                 * Charge les pages d'un projet
                 *
                 * @param [String] uri:self.OPEN_URI
                 *
                 */
                open: function (uri, project_path) {
                    var q = $q.defer();
                    uri += '/' + md5.createHash(project_path);
                    this.call('get', uri).then(function (data) {
                        q.resolve(data);
                    }, function (status) {
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
                    var q = $q.defer();
                    this.call('get', uri).then(function (data) {
                        q.resolve(data);
                    }, function (status) {
                        q.reject(status);
                    });
                    return q.promise;
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
                    var q = $q.defer();
                    this.call('post', uri, {
                        project_path: project_path
                    }).then(function (data) {
                        q.resolve(data);
                    }, function (status) {
                        q.reject(status);
                    });
                    return q.promise;
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
                    var q = $q.defer();
                    this.call('put', uri, {
                        project: project
                    }).then(function (data) {
                        q.resolve(data);
                    }, function (status) {
                        q.reject(status);
                    });
                    return q.promise;
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
                    var q = $q.defer();
                    this.call('delete', uri, {
                        project_id: md5.createHash(project_path)
                    }).then(function (data) {
                        q.resolve(data);
                    }, function (status) {
                        q.reject(status);
                    });
                    return q.promise;
                }
            };

        }]);
}());
