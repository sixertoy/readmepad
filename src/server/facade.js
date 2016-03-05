/*jslint indent: 4, nomen: true, plusplus: true */
/*globals require, module */
(function () {

    'use strict';
    
    var Facade = {
        application: false
    }

    module.exports = Facade;
    module.exports.getApplication = function(){
        return Facade.application;
    };
    module.exports.setApplication = function(app){
        Facade.application = app;
    };

}());
