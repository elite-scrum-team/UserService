const chai = require('chai');
chai.use(require('sinon-chai'));
let expect = chai.expect;

let result;
const controller = require('../controllers/AuthorizationController');

describe('AuthorizationController', () => {
    const user = {
        email: 'NiceBoi@boi.no',
        password: 'password',
        phone: '987651723',
        isAdmin: false,
    };

    it('checking if passwords are equal before hashing', () => {
        expect(user.password).to.equal(user.password);
    });

    context('hashing passwords ', () => {
        before(async () => {
            await controller.setPassword(user, user.password);
            result = await controller.verify(user, 'password');
        });

        it('checking if password is hashed', () => {
            expect(user.password).to.equal(user.password);
        });

        it('Checking verify password', () => {
            expect(result).to.be.true;
        });
    });
});
