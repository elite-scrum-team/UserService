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
    async retriveOne(id) {
        const user = await users.findByPk(id);
        if (user) return user.dataValues;
        else return {};
    },
    async update() {},
    async delete() {},
};
