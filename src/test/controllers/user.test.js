const { expect } = require('chai');
const sinon = require('sinon');
const proxyquire = require('proxyquire');
const { makeMockModels } = require('sequelize-test-helpers');
/*
* can unit-test all of your code that relies on your models,
* without going anywhere near your database.
* This keeps your tests isolated and fast.
* */

const mockModels = makeMockModels({ User: { findOne: sinon.stub() }});

// As a convenience, makeMockModels will automatically populate your mockModels with mocks of all of the models defined
// in your src/models folder (or if you have a .sequelizerc file it will look for the model-path in that).
// Simply override any of the specific models you need to do stuff with.

const save = proxyquire('../../controllers/UserController', { '../models/user': mockModels });

const fakeUser = { update: sinon.stub() }


describe('User testing', () => {
    const user = {
        email: "NiceBoi@boi.no",
        password: "password",
        phone: "987651723",
        isAdmin: false
    };

    const resetStubs = () => {
        mockModels.User.findOne.resetHistory();
        fakeUser.update.resetHistory();
    };

    let result;

    context('testing create ',() =>{




    })
});



