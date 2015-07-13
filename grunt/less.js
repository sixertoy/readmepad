/*jslint indent: 4 */
/*global module */
module.exports = {
    development: {
        options:{
            compress: true
        },
        files: {
            "./build/public/html/css/styles.min.css": "./src/html/less/styles.less"
        }
    }
};
