const db = require('../models');
//const crypto = require('crypto');

const AuthorizationController = require('./AuthorizationController.js');

const NotificationService = require('../services/NotificationService');

module.exports = {
    async create(email, password, phone) {
        //const password = crypto.randomBytes(15).toString('base64');
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
    async resetPassword(email) {
        const password = '1234abcd'; //crypto.randomBytes(15).toString('base64');
        try {
            const user = await db.user.findOne({ where: { email: email } });
            await AuthorizationController.setPassword(user, password);
            await user.update();
            await NotificationService.email.register(email, 'bob', password);
        } catch (err) {
            logging.error(err);
        }
    },
    async retriveOne(id) {
        const user = await db.user.findByPk(id, { include: [{ all: true }] });
        if (user) return user.dataValues;
        else return null;
    },

    async retrieveOneFiltered(id) {
        const user = await db.user.findByPk(id, {
            attributes: ['id', 'email', 'phone', 'isAdmin'],
            include: [
                {
                    model: db.group,
                    as: 'group',
                    attributes: ['id', 'name', 'municipalitiy'],
                },
            ],
        });
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
