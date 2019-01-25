const proxyquire = require('proxyquire');
const chai = require('chai');
chai.use(require('sinon-chai'));
let expect = chai.expect;
const sinon = require('sinon');

const { makeMockModels } = require('sequelize-test-helpers');

const mockModels = makeMockModels({
    user: {
        create: sinon.stub(),
        findOne: sinon.stub(),
        findByPk: sinon.stub(),
    },
});

const save = proxyquire('../controllers/UserController', {
    '../models': mockModels,
});
let result;

const fakeUser = { dataValues: sinon.stub() };

describe('User testing', () => {
    const user = {
        id: 1,
        email: 'NiceBoi@boi.no',
        password: 'password',
        phone: '987651723',
        isAdmin: false,
    };

    const resetStubs = () => {
        mockModels.user.findOne.resetHistory();
        fakeUser.dataValues.resetHistory();
    };

    context('testing retriveOneByEmail() on a User that doesnt exist ', () => {
        before(async () => {
            mockModels.user.findOne.resolves(undefined);
            result = await save.retriveOneByEmail(user.email);
        });

        after(resetStubs);

        it('called User.findOneOne', () => {
            expect(mockModels.user.findOne).to.have.been.called;
        });

        it("didn't call user.update", () => {
            expect(fakeUser.dataValues).not.to.have.been.called;
        });

        it('returned null', () => {
            expect(result).to.be.a('null', 'the returned value is not null');
        });
    });

    context('testing retriveOneByEmail() on user that exist', () => {
        before(async () => {
            mockModels.user.findOne.resolves(fakeUser);
            result = await save.retriveOneByEmail(user.email);
        });

        after(resetStubs);

        it('called User.findOne', () => {
            expect(mockModels.user.findOne).to.have.been.called;
        });

        it('returned the user', () => {
            expect(result).to.deep.equal(fakeUser.dataValues);
        });
    });

    context('testing retriveOne() on non existing user', () => {
        before(async () => {
            mockModels.user.findByPk.resolves(undefined);
            result = await save.retriveOne(user.id);
        });

        after(resetStubs);

        it('called User.findOneOne', () => {
            expect(mockModels.user.findByPk).to.have.been.called;
        });

        it("didn't call user.update", () => {
            expect(fakeUser.dataValues).not.to.have.been.called;
        });

        it('returned  null', () => {
            expect(result).to.be.a('null', 'the returned argument is not null');
        });
    });

    context('testing retriveOne() on user', () => {
        before(async () => {
            mockModels.user.findByPk.resolves(fakeUser);
            result = await save.retriveOne(user.id);
        });

        after(resetStubs);

        it('called User.findOneOne', () => {
            expect(mockModels.user.findByPk).to.have.been.called;
        });

        it('returned the user', () => {
            expect(result).to.deep.equal(fakeUser.dataValues);
        });
    });

    context('testing resetPassword', () => {
        before(async () => {
            mockModels.user.findOne.resolves(fakeUser);
            result = await save.resetPassword(user.id);
        });

        after(resetStubs);

        it('called User.findOneOne', () => {
            expect(mockModels.user.findOne).to.have.been.called;
        });
    });

    context('testing change passord', () => {
        before(async () => {
            mockModels.user.findByPk.resolves(fakeUser);
            result = await save.changePassword('newPassword', user.id);
        });

        after(resetStubs);

        it('called User.findOneOne', () => {
            expect(mockModels.user.findByPk).to.have.been.called;
        });
    });

    context('testing create()', () => {
        before(async () => {
            mockModels.user.create.resolves(fakeUser);
            result = await save.create(user.email, user.password, user.phone);
        });

        after(resetStubs);

        it('called User.findOneOne', () => {
            expect(mockModels.user.create).to.have.been.called;
        });

        it('Checking if mockModels and created an object', () => {
            expect(mockModels.user.create.firstCall.lastArg).to.not.be
                .undefined;
        });

        it('Checking if password is hashed', () => {
            expect(mockModels.user.create.firstCall.lastArg).to.not.equal(user);
        });

        it('Checking if email is correct', () => {
            expect(
                mockModels.user.create.firstCall.lastArg.email
            ).to.deep.equal(user.email);
        });
        it('Checking if phone is correct', () => {
            expect(
                mockModels.user.create.firstCall.lastArg.phone
            ).to.deep.equal(user.phone);
        });
    });
});
