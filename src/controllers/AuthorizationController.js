const bcrypt = require('bcrypt');

const UserController = require('./UserController.js');

module.exports = {
    async verify(user, password) {
        try {
            return await bcrypt.compare(password, user.password);
        } catch(e) {
            console.error(e);
        }
        return false;
    },
    async setPassword(user, password) {
        const hash = await bcrypt.hash(password, 10);
        user['password'] = hash;
    }
}
