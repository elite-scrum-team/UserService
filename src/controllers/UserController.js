const db = require('../models');

const AuthorizationController = require('./AuthorizationController.js');

const NotificationService = require('../services/NotificationService');

module.exports = {
    async create(email, password, phone) {
        const user = {
            email: email,
            phone: phone,
            isAdmin: false,
        };
        try {
            await AuthorizationController.setPassword(user, password);
            const instance = await db.user.create(user);
            await NotificationService.email.register(email, 'bob', password);
            return instance;
        } catch (err) {
            console.error(err);
            return undefined;
        }
    },
    async retrive() {},

    async retriveOne(id) {
        const user = await db.user.findByPk(id, { include: [{ all: true }] });
        if (user) return user.dataValues;
        else return null;
    },
    async retriveOneByEmail(email) {
        const user = await db.user.findOne({ where: { email: email } });
        if (user) return user.dataValues;
        else return null;
    },
    async update() {},
    async delete() {},
};
