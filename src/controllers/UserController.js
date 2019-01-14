const { users } = require('../models');

const AuthorizationController = require('./AuthorizationController.js');

module.exports = {
    async create(email, password, phone) {
        const user = {
            email: email,
            phone: phone,
            isAdmin: false,
        };
        await AuthorizationController.setPassword(user, password);
        return await users.create(user);
    },
    async retrive() {},
    async retriveOne(email) {
        const user = await users.find({ where: { email: email } });
        if (user) return user.dataValues;
        else return null;
    },
    async update() {},
    async delete() {},
};
