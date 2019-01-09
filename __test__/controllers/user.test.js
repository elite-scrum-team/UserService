let SequelizeMock = require('sequelize-mock');
let proxyquire = require('proxyquire');
let controller = require('../../src/controllers/UserController');

// lager en mock database
let dbMock = new SequelizeMock();

let UserMock = dbMock.define('user', {
    email: "test@example.com",
    password: "123",
    phone: "921",
    isAdmin: false
});

let myModule = proxyquire('user.controller', {
    './user.model': UserMock
});

describe('#getUserEmail', function () {

    it("testing retriveOne", (done) => {
        myModule.retriveOne("test@example.com")
            .then(e =>{
                console.log(e);
                done();
        }).catch(done);
    });
});


