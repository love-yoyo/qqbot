var log = require('./util/log');

var path = require('path');
var fs = require('fs');
var _ = require('underscore');
var http = require('http');

var config = require('../config');

function getTulingRs(postData, callback) {
    // Build the post string from an object
    var post_data = JSON.stringify(postData);

    // An object of options to indicate where to post to
    var post_options = {
        protocol: 'http:',
        host: "www.tuling123.com",
        port: '80',
        path: '/openapi/api',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }
    };

    // Set up the request
    var post_req = http.request(post_options, function (res) {
        res.setEncoding('utf8');
        var body = "";
        res.on('data', function (chunk) {
            body += chunk;
            console.log('Response: ' + chunk);
        });
        res.on('end', function () {
            callback(body);
        })
    });

    // post the data
    post_req.write(post_data);
    post_req.end();

}

var handleMsg = function (msg, qqbot) {
    console.log('start handle msg');
    var useTuling = false;

    var shellConfig = fs.readFileSync(path.join(__dirname, './shell/shell-config.json'), 'utf8')
    shellConfig = JSON.parse(shellConfig);

    var _isFindShell = _.find(config.shellAccount, function (val) {
        return msg.from_user.account == val
    })
    if (_isFindShell) {
        _.each(shellConfig, function (val, key) {
            if (msg.content && (msg.content == val)) {
                useTuling = true;
                var shellPath = path.join(__dirname, './shell/' + key);
                shellPath += '.js';

                //clear require cache
                delete require.cache[shellPath];
                require(shellPath)(msg, qqbot);
            }
        });
    }

    if (!useTuling) {
        var _isFind = _.find(config.allowAccount, function (val) {
            return msg.from_user.account == val
        })
        if (!_isFind) {
            return
        }
        qqbot.get_user_uin(msg.from_user.account, function (err, uin) {
            getTulingRs({
                key: "9df55500d66343af9f5868c1300f5bbe",
                info: msg.content,
                userid: msg.from_uin
            }, function (res) {
                res = JSON.parse(res);
                console.log(res.text);
                qqbot.send_message(uin, res.text, function (ret, e) {
                    log.info(ret)
                    log.info(e)
                })
            });
        })
    }
}

module.exports = function (msg, qqbot) {
    log.info(JSON.stringify(msg));
    handleMsg(msg, qqbot);
}