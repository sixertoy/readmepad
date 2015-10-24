/*jslint indent: 4, nomen: true */
/*global require, module */
(function () {

    'use strict';

    var include = require('include');
    include.root('src/server');
    module.exports = include('server');

}());
