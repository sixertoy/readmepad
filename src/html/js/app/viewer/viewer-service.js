/*jslint indent: 4 */
/*globals angular */
(function () {

    'use strict';

    angular.module('readmepadAppSidebar')
        .factory('ProjectsService', ['$sce', '$q', '$http', 'lodash', 'md5', function ($sce, $q, $http, lodash, md5) {

            var projects = [];

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
                open: function (uri, project) {
                    var q = $q.defer();
                    /*
                    uri += '/' + md5.createHash(project.path);
                    this.call('get', uri).then(function (scan) {

                        // supprime le projet courant
                        // dans la liste des projets
                        list = projects.concat([]);
                        lodash.pullAt(list, lodash.findIndex(list, project));
                        q.resolve({projects: list, project: project, data: scan});
                    }, function (status) {
                        q.reject(status);
                    });
                    */
                    return q.promise;
                }

            };
        }]);
}());
