var crypto = require('crypto');
var fs = require('fs');
var path = require('path');

var pem = fs.readFileSync(path.join(__dirname, './key.pem'));
var key = pem.toString('ascii');

var encrypt = function(str) {
    var plaintext = new Buffer(str);
    var encrypted = "";
    var cipher = crypto.createCipher('aes192', key);

    encrypted += cipher.update(plaintext, 'binary', 'hex');
    encrypted += cipher.final('hex');
    console.log(encrypted);
    return encrypted;
}

var decrypt = function(str) {
    var decrypted = "";
    var decipher = crypto.createDecipher('aes192', key);
    decrypted += decipher.update(str, 'hex', 'binary');
    decrypted += decipher.final('binary');

    var output = new Buffer(decrypted);
    console.log(output.toString());
    return output.toString();
}

module.exports = {
    encrypt: encrypt,
    decrypt: decrypt
}
