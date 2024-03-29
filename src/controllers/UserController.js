const db = require('../models');
const crypto = require('../util/pass');

const AuthorizationController = require('./AuthorizationController.js');

const NotificationService = require('../services/NotificationService');

module.exports = {
    async create(email, password, phone) {
        let sendMail = false;
        if (!password) {
            password = crypto.generatePassword();
            sendMail = true;
        }
        const user = {
            email: email,
            phone: phone,
            isAdmin: false,
        };
        try {
            await AuthorizationController.setPassword(user, password);
            const instance = await db.user.create(user);
            if (sendMail) {
                await NotificationService.email.register(email, password);
            }
            return instance;
        } catch (err) {
            console.error(err);
            return undefined;
        }
    },

    async resetPassword(email) {
        const password = crypto.generatePassword();
        try {
            const user = await db.user.findOne({ where: { email: email } });
            await AuthorizationController.setPassword(user, password);
            await user.save();
            await NotificationService.email.newPassword(email, password);
            return { msg: 'Password reset' };
        } catch (err) {
            return { status: 400 };
        }
    },
    async retriveOne(id) {
        const user = await db.user.findByPk(id, { include: [{ all: true }] });
        if (user) return user.dataValues;
        else return null;
    },

    async changePassword(password, userId) {
        try {
            const user = await db.user.findByPk(userId, {
                include: [{ all: true }],
            });
            await AuthorizationController.setPassword(user, password);
            await user.save(user);
            return { msg: 'Changed password succesfully' };
        } catch (err) {
            return { status: 400 };
        }
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
