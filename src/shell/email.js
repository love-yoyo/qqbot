var path = require('path');
var logUtil = require('../util/log').log4js;

var logger = logUtil.getLogger('shell');
logger.setLevel('TRACE');

module.exports = function(){
    console.log('enter in email');
}