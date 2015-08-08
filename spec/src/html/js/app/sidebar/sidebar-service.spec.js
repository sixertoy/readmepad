/*jshint unused: false */
/*jslint indent: 4, nomen: true */
/*global __dirname, jasmine, describe, xdescribe, it, xit, expect, beforeEach, afterEach, afterLast, console, module, inject */
(function () {

    'use strict';

    var $service, $scope, $rootScope, $httpBackend, authRequestHandler;

    describe('ProjectsService', function () {

        beforeEach(function () {

            module('readmepadApp');
            module('readmepadAppSidebar');

            inject(function ($injector) {
                $httpBackend = $injector.get('$httpBackend');
                authRequestHandler = $httpBackend.when('GET', '/project/loadAll')
                    .respond([{}, {}, {}]);
                $service = $injector.get('ProjectsService');
            });

        });

        afterEach(function () {
            $httpBackend.verifyNoOutstandingExpectation();
            $httpBackend.verifyNoOutstandingRequest();
        });

        describe('service rest api url', function () {
            it('returns true', function () {
                expect($service.OPEN_URI).to.equal('/project/open');
                expect($service.REMOVE_URI).to.equal('/project/delete');
                expect($service.UPDATE_URI).to.equal('/project/update');
                expect($service.CREATE_URI).to.equal('/project/create');
                expect($service.LOADALL_URI).to.equal('/project/loadall');
            });
        });

    });

}());
