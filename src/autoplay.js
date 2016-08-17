var Log = require('log');
var log = new Log('debug');

var path = require('path');
var fs = require('fs');
var _ = require('underscore');



var handleMsg = function(msg) {
    if (msg.from_user.account === 787207323) {
        var shellConfig = fs.readFileSync(path.join(__dirname, './shell/shell-config.json'), 'utf8')
        shellConfig = JSON.parse(shellConfig);
        _.each(shellConfig, function(val, key) {
            if (msg.content && (msg.content == val)) {
                require(path.join(__dirname, './shell/' + key))();
            }
        });
    }
}



module.exports = function(msg) {
    log.info(JSON.stringify(msg));
    handleMsg(msg);
}
