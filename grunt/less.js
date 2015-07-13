/*jslint indent: 4 */
/*global module */
module.exports = {
    development: {
        options:{
            compress: true
        },
        files: {
            "./public/html/css/styles.min.css": "./src/html/less/styles.less"
        }
    }
};
