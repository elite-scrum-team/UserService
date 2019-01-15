const jwt = require('jsonwebtoken');

module.exports = {
    async generateToken(data) {
        return jwt.sign(data, 'secret');
    },
};
