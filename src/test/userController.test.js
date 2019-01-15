const proxyquire = require('proxyquire');
const chai = require('chai');
chai.use(require('sinon-chai'));
let expect = chai.expect;
const sinon = require('sinon');

const { makeMockModels } = require('sequelize-test-helpers');

const mockModels = makeMockModels({
    users: { create: sinon.stub(), findOne: sinon.stub() },
});

const save = proxyquire('../controllers/UserController', {
    '../models': mockModels,
});
let result;

const fakeUser = { dataValues: sinon.stub() };

describe('User testing', () => {
    const user = {
        email: 'NiceBoi@boi.no',
        password: 'password',
        phone: '987651723',
        isAdmin: false,
    };

    const resetStubs = () => {
        mockModels.users.findOne.resetHistory();
        fakeUser.dataValues.resetHistory();
    };

    context('testing retriveOne() on a User that doesnt exist ', () => {
        before(async () => {
            mockModels.users.findOne.resolves(undefined);
            result = await save.retriveOne(user.email);
        });

        after(resetStubs);

        it('called User.findOne', () => {
            expect(mockModels.users.findOne).to.have.been.called;
        });

        it("didn't call user.update", () => {
            expect(fakeUser.dataValues).not.to.have.been.called;
        });

        it('returned null', () => {
            expect(result).to.be.null;
        });
    });

    context('testing retreveOne() on user that does exist', () => {
        before(async () => {
            mockModels.users.findOne.resolves(fakeUser);
            result = await save.retriveOne(user.email);
        });

        after(resetStubs);

        it('called User.findOne', () => {
            expect(mockModels.users.findOne).to.have.been.called;
        });

        it('returned the user', () => {
            expect(result).to.deep.equal(fakeUser.dataValues);
        });
    });

    context('testing create()', () => {
        before(async () => {
            mockModels.users.create.resolves(fakeUser);
            result = await save.create(user.email, user.password, user.phone);
        });

        after(resetStubs);

        it('called User.findOne', () => {
            expect(mockModels.users.create).to.have.been.called;
        });

        it('Checking if mockModels and created an object', () => {
            expect(mockModels.users.create.firstCall.lastArg).to.not.be
                .undefined;
        });

        it('Checking if password is hashed', () => {
            expect(mockModels.users.create.firstCall.lastArg).to.not.equal(
                user
            );
        });

        it('Checking if email is correct', () => {
            expect(
                mockModels.users.create.firstCall.lastArg.email
            ).to.deep.equal(user.email);
        });
        it('Checking if phone is correct', () => {
            expect(
                mockModels.users.create.firstCall.lastArg.phone
            ).to.deep.equal(user.phone);
        });
    });
});
