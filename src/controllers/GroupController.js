const db = require('../models');

module.exports = {
    async create(group) {
        try {
            return await db.group.create(group);
        } catch (err) {
            console.error(err);
            return null;
        }
    },
    async retrieve() {
        try {
            return await db.group.findAll();
        } catch (err) {
            console.error(err);
            return null;
        }
    },
    async addUser(group, user) {
        return {};
    },
    async deleteUser(group, user) {
        return {};
    },
};
