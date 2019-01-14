const { expect } = require('chai');
const sinon = require('sinon');
const proxyquire = require('proxyquire');
/*
* can unit-test all of your code that relies on your models,
* without going anywhere near your database.
* This keeps your tests isolated and fast.
* */

const { makeMockModels, listModels } = require('sequelize-test-helpers');

//As a convenience, makeMockModels will automatically populate your mockModels with mocks of all of the models defined
// in your src/models folder (or if you have a .sequelizerc file it will look for the model-path in that).
// Simply override any of the specific models you need to do stuff with.

const mockModels = makeMockModels({ user: { findOne: sinon.stub() }});

// We then use proxyquire to insert the mockModels in the place of the real models.

const controller = proxyquire('../../controllers/UserController', {
    'models': mockModels
});

const fakeUser = { update: sinon.stub() };

describe('src/utils/save', () => {

    const data = {
        email: 'Testy@tes2t.com',
        password: 'McTestface',
        phone: '911',
        isAdmin: false
    };

    const resetStubs = () => {
        mockModels.User.findOne.resetHistory();
        fakeUser.update.resetHistory()
    };

    let result;
        beforeEach( async () => {
            console.log(listModels());
            mockModels.User.findOne.resolves('Testy@test.com');
            result = await controller.retriveOne(data)
        });

        afterEach(resetStubs);

        it('called User.findOne', () => {
            let user = controller.retriveOne('Testy@test.com')

        });

});
