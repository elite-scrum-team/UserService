const UserController = require('./UserController.js');

module.exports = {
    async validate(user, password) {
        return await bcrypt.compare('password', user.password);
    },
    async setPassword(user, password) {
        const hash = await bcrypt.hash(password, 10);
        user[password] = hash;
    }
}
