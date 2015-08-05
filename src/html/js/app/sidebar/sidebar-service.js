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
                    var list,
                        q = $q.defer();
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
                        // si il existent de projets en BDD
                        if (data.length) {
                            projects = lodash.sortBy(data, function (obj) {
                                return obj.name.toLowerCase();
                            });
                            q.resolve(projects);
                        } else {
                            // sinon on renvoi null
                            // a l'init de l'app
                            // le menu projet sera vide
                            q.resolve(null);
                        }
                    }, function (status) {
                        q.reject(status);
                    });
                    return q.promise;
                },

                /**
                 *
                 * Creation d'un projet
                 * Si le projet existe dans la liste des projets
                 * On Retourne uniquement le projet
                 * Sinon on cree le projet en BDD
                 *
                 * @param [String] uri:self.CREATE_URI
                 * @param [Object] params {uri, name}
                 *
                 */
                create: function (uri, params) {
                    var q = $q.defer(),
                        project_id = md5.createHash(params.uri),
                        project = lodash.find(projects, function (obj) {
                            return (obj.project_id === project_id);
                        });
                    if (project) {
                        q.resolve({
                            projects: false,
                            project: project
                        });
                    } else {
                        this.call('post', uri, params).then(function (project) {
                            // on ajoute le nouveau projet a la liste
                            projects.push(project);
                            // mise a jour de la liste des projets
                            projects = lodash.sortBy(projects, function (obj) {
                                return obj.name.toLowerCase();
                            });
                            q.resolve({
                                projects: projects,
                                project: project
                            });
                        }, function (status) {
                            q.reject(status);
                        });
                    }
                    return q.promise;
                },

                /**
                 *
                 * Mise a jour d'un projet
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
                remove: function (uri, index) {
                    var q = $q.defer();
                    uri += '/' + projects[index].project_id;
                    this.call('delete', uri).then(function (data) {
                        if (data) {
                            lodash.pullAt(projects, index);
                        }
                        q.resolve(projects);
                    }, function (status) {
                        q.reject(status);
                    });
                    return q.promise;
                }
            };

        }]);
}());
