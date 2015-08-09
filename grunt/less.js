/*jslint indent: 4 */
/*global module */
module.exports = {
    development: {
        options:{
            compress: true,
            sourceMap: true
        },
        files: {
            "./build/public/css/styles.min.css": "./src/html/less/styles.less",
            "./build/public/css/github.min.css": "./src/html/less/github.less"
        }
    }
};
