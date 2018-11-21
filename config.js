(function () {
    var yaml = require('js-yaml');
    var fs = require('fs');

    var security = require('./src/crypto/security');

    var path = './config.yaml';
    if (!fs.existsSync(path)) path = __dirname + '/config.yaml';

    if (!fs.existsSync(path)) {
        console.log("config.yaml not found at ./ or " + __dirname);
        process.exit(0);
    }

    var config = fs.readFileSync(path, 'utf8');

    var _configJson = yaml.load(config);
    /*if (_configJson.encrypt) {
      _configJson.password = security.decrypt(_configJson.password);
    }*/
    module.exports = _configJson;

}).call(this);