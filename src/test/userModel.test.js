//Unit-Testing a Model’s Name and Properties

const {
    sequelize,
    dataTypes,
    checkModelName,
    checkPropertyExists,
} = require('sequelize-test-helpers');

const Usermodel = require('../models/user');

describe('src/models/user', () => {
    const Model = Usermodel(sequelize, dataTypes);
    const instance = new Model();

    // checking if the model is the same instance as the newmodel()
    checkModelName(Model)('user');

    context('properties', () => {
        ['email', 'password', 'phone', 'isAdmin'].forEach(
            checkPropertyExists(instance)
        );
    });
});
