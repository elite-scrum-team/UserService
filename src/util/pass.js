const crypto = require('crypto');

module.exports = {
    generatePassword() {
        return crypto.randomBytes(18).toString('base64');
    },
};
