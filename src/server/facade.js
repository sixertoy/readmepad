/*jslint indent: 4, nomen: true, plusplus: true */
/*globals require, module, console */
(function () {

    'use strict';
    var path = require('path'),
        chalk = require('chalk'),
        //
        // Facade
        Facade = {
            ok: function (res, data) {
                console.log(chalk.green('send data to client'));
                res.send(data);
            },
            send404: function (res, err) {
                console.log(chalk.red('server error'));
                res.status(404).send({
                    error: err
                });
            },

            /**
             *
             *
             *
             */
            items: function (pages, items) {
                var ext;
                pages.forEach(function (item) {
                    if (item.files && item.files.length > 0) {
                        // recursive
                        Facade.items(item.files, items);
                    } else {
                        ext = path.extname(item.name);
                        if (ext === '.md') {
                            items.push({
                                path: item.fullpath,
                                name: path.basename(item.name, ext)
                            });
                        }
                    }
                });
                return items;
            },

            /**
             *
             *
             *
             */
            document: function (doc) {
                var items = [];
                return {
                    name: doc.name,
                    path: doc.path,
                    items: Facade.items(doc.pages, items)
                };
            }
        };

    module.exports = Facade;

}());
