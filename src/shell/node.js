var path = require('path');
var logUtil = require('../util/log').log4js;

var logger = logUtil.getLogger('shell');
logger.setLevel('TRACE');

module.exports = function(msg, qqbot) {
    console.log('enrer in this');
    logger.info('this is node:' + msg.from_uin);
    /*qqbot.send_message(msg.from_uin, 'got it, Boss', function(ret, e) {
        logger.info(ret)
        logger.info(e)
    });*/

    qqbot.get_user_uin(msg.from_user.account, function(err, uin) {
        qqbot.send_message(uin, 'got it, Boss', function(ret, e) {
            logger.info(ret)
            logger.info(e)
        })
    })

}
