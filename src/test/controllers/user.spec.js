'use strict';
const chai = require('chai');
chai.use(require('sinon-chai'));
let expect = chai.expect;
const sinon = require('sinon');
const proxyquire = require('proxyquire');
const { makeMockModels } = require('sequelize-test-helpers');

const mockModels = makeMockModels({ user: { findOne: sinon.stub() } });

const controller = proxyquire('../../controllers/UserController', {
    '/models': mockModels,
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
        mockModels.user.findOne.resetHistory();
        fakeUser.update.resetHistory();
    };

    let result;

    context('testing retriveOne() on a User that doesnt exist ', () => {
        beforeAll(async () => {
            mockModels.user.findOne.resolves(undefined);
            result = await controller.retriveOne(user.email);
        });

        afterAll(resetStubs);

        it("didn't call user.update", () => {
            expect(fakeUser.update).not.to.have.been.called;
        });

        it('returned null', () => {
            console.log(result);
            expect(user).to.be.null;
        });
    });

    context('user exists', () => {
        beforeAll(async () => {
            fakeUser.update.resolves(fakeUser);
            mockModels.user.findOne.resolves(fakeUser);
            result = await User.retriveOne(user);
        });

        afterAll(resetStubs);

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
