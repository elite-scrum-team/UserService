const db = require('../models');
const Op = require('sequelize').Op

module.exports = {
    async create(group) {
        try {
            return await db.group.create(group);
        } catch (err) {
            console.error(err);
            return null;
        }
    },
    async retrieve({ onlyCompanies }) {
        let where = {}

        if (onlyCompanies) {
            where.municipalitiy = {
                [Op.eq]: null
            }
        }

        try {
            return await db.group.findAll({where});
        } catch (err) {
            console.error(err);
            return null;
        }
    },
    async addUser(groupId, userId) {
        try {
            return await db.user_group.create({ groupId, userId });
        } catch (err) {
            console.error(err);
            return null;
        }
    },
    async deleteUser(groupId, userId) {
        try {
            return (await db.user_group.destroy({ where: { groupId, userId } }))
                .dataValue;
        } catch (err) {
            console.error(err);
            return null;
        }
    },

    async update(update, groupId) {
        try {
            return (await db.group.findByPk(groupId).then(group => group.update(update))).dataValue
        } catch (err) {
            console.error(err)
            return null
        }
    }
};
