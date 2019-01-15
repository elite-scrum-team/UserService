const proxyquire = require('proxyquire');
const chai = require('chai');
chai.use(require('sinon-chai'));
let expect = chai.expect;
const sinon = require('sinon');

const { makeMockModels, listModels } = require('sequelize-test-helpers');

const mockModels = makeMockModels({ users: { findOne: sinon.stub() } });

const save = proxyquire('../controllers/UserController', {
    '../models': mockModels,
});

const fakeUser = { update: sinon.stub() };

describe('User testing', () => {
    const user = {
        email: 'NiceBoi@boi.n6o',
        password: 'password',
        phone: '987651723',
        isAdmin: false,
    };

    const resetStubs = () => {
        mockModels.users.findOne.resetHistory();
        fakeUser.update.resetHistory();
    };

    let result;

    context('testing retriveOne() on a User that doesnt exist ', () => {
        before(async () => {
            console.log(listModels());
            console.log(mockModels);
            mockModels.users.findOne.resolves(undefined);
            result = await save.retriveOne(user.email);
        });

        after(resetStubs);

        it('called User.findOne', () => {
            expect(mockModels.users.findOne).to.have.been.called;
        });

        it("didn't call user.update", () => {
            expect(fakeUser.update).not.to.have.been.called;
        });

        it('returned null', () => {
            expect(result).to.be.null;
        });
    });

    context('user exists', () => {
        before(async () => {
            fakeUser.update.resolves(fakeUser);
            mockModels.users.findOne.resolves(fakeUser);
            result = await save.retriveOne(user.email);
        });

        after(resetStubs);

        it('called User.findOne', () => {
            expect(mockModels.users.findOne).to.have.been.called;
        });

        it('called user.update', () => {
            expect(fakeUser.update).to.have.been.calledWith(sinon.match(user));
        });

        it('returned the user', () => {
            expect(result).to.deep.equal(fakeUser);
        });
    });
});
