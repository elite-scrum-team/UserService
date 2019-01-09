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
        await users.create(user); 
    },
    async retrive() {
         
    },
    async retriveOne(email) {
        return (await users.find({ where: { email: email }})).dataValues;
    },
    async update() {

    },
    async delete() {

    }
}
