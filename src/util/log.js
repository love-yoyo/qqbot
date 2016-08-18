var path = require('path');
var log4js = require('log4js');

var logConfigPath = path.join(__dirname, 'log.config.json');
var logContainerPath = path.join(__dirname, '../../log');

log4js.configure(logConfigPath, { cwd: logContainerPath });

var logger = log4js.getLogger('qqbot');
logger.setLevel('TRACE');

module.exports = {
    log4js: log4js,
    trace: function(msg) {
        logger.trace(msg);
    },
    debug: function(msg) {
        logger.debug(msg);
    },
    info: function(msg) {
        logger.info(msg);
    },
    warn: function(msg) {
        logger.warn(msg);
    },
    error: function(msg) {
        logger.error(msg);
    },
    fatal: function(msg) {
        logger.fatal(msg);
    }
};
