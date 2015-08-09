/*jslint indent: 4 */
/*global module */
module.exports = {
    all:{
        options:{
            partials: {
                src:"./src/html/partials"
            }
        },
        files: [{
            "./build/public/index.html": "./src/html/index.tpl"
        }]
    }
};
