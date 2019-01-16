const db = require('../models');

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
            return await db.user.create(user);
        } catch (err) {
            return undefined;
        }
    },
    async retrive() {},

    async retriveOne(id) {
        const user = await db.user.findByPk(id, { include: [{ all: true }] });
        if (user) return user.dataValues;
        else return undefined;
    },
    async retriveOneByEmail(email) {
        const user = await db.user.findOne({ where: { email: email } });
        if (user) return user.dataValues;
        else return undefined;
    },
    async update() {},
    async delete() {},
};
