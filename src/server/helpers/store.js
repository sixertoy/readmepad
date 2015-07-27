/*jslint indent: 4, nomen: true, plusplus: true */
/*globals require, module, console */
(function () {

    'use strict';

    var db, dbfile,
        nedb = require('nedb');

    module.exports = {

        /**
         *
         *
         *
         */
        init: function (database) {
            try {
                dbfile = database;
                db = new nedb({
                    autoload: true,
                    filename: dbfile
                });
            } catch (e) {
                throw e;
            }
        },

        /**
         *
         *
         *
         */
        load: function (server, port) {
            try {
                db.loadDatabase(function (err) {
                    if (err) {
                        console.log('ReadmePad is unable to load database: %s', dbfile);
                    } else {
                        db.ensureIndex({
                            unique: true,
                            fieldName: 'project_name'
                        }, function (err) {
                            if (err) {
                                console.log('ReadmePad is unable to create index on: %s datbase', dbfile);
                            } else {
                                server.listen(port, function () {
                                    console.log('ReadmePad now running under http://localhost:%d', port);
                                });
                            }
                        });
                    }
                });
            } catch (e) {
                throw e;
            }
        }
    };

}());
