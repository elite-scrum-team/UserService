let SequelizeMock = require('sequelize-mock');

let controller = require('../../src/controllers/UserController');

// lager en mock database
let dbMock = new SequelizeMock();

let UserMock = dbMock.define('user', {
    email: "test@example.com",
    password: "123",
    phone: "921",
    isAdmin: false
});

describe('#getUserEmail', function () {

    it("should return a user's email in NAME <EMAIL> format", (done) => {
        myModule.getUserEmail(1).then(function (email) {


            done();

        }).catch(done);
    });
});


