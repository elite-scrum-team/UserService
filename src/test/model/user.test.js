//Unit-Testing a Model’s Name and Properties
const {
    sequelize,
    dataTypes,
    checkModelName,
    checkPropertyExists
} = require('sequelize-test-helpers');

const SimpleModel = require('../../models/user');

describe('src/models/user', () => {
    const Model = SimpleModel(sequelize, dataTypes);
    const instance = new Model();

    checkModelName(Model)('users');

    it('properties', () => {
        ['email', 'password', 'phone', 'isAdmin'].forEach(checkPropertyExists(instance))
    });
});
