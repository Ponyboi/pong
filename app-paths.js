var path = require('path');

/**
 * webpack's compiled folder
 */
module.exports.BUILD_PATH = path.resolve(__dirname, 'build');
/**
 * location of the web app
 */
module.exports.APP_PATH = path.resolve(__dirname, 'public');
/**
 * location of the server
 */
module.exports.SERVER_PATH = path.resolve(__dirname, 'server');
/**
 * location of the shared scripts folder
 */
module.exports.SHARED_PATH = path.resolve(__dirname, 'shared');
