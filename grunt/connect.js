/*jslint indent: 4 */
/*global module */
module.exports = {
    server: {
        options: {
            open: true,
            port: 8080,
            debug: true,
            keepalive: true,
            protocol: 'http',
            base: ['./build'],
            livereload: 35729,
            hostname: 'localhost'
        }
    }
};
