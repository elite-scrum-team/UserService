const { users } = require('../models');

const AuthorizationController = require('./AuthorizationController.js');

module.exports = {
    async create(email, password, phone) {
        const user = {
            email: email,
            phone: phone,
            isAdmin: false,
        };
        try {
            await AuthorizationController.setPassword(user, password);
            return await users.create(user);
        } catch (err) {
            return undefined;
        }
    },
    async retrive() {},

    async retriveOne(id) {
        const user = await users.findByPk(id, { include: [{ all: true }] });
        if (user) return user.dataValues;
        else return null;
    },
    async retriveOneByEmail(email) {
        const user = await users.find({ where: { email: email } });
        if (user) return user.dataValues;
        else return null;
    },
    async update() {},
    async delete() {},
};
