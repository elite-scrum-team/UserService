
const express = require('express');

const UserController = require('../controllers/UserController');
const AuthorizationController = require('../controllers/AuthorizationController');

const router = express.Router();

router.post('/login', async (req, res) => {
    if (req.body.email === undefined) {
        await res.send({ errors: { email: 'This field is required' }});
        return;
    }
    const user = await UserController.retriveOne(req.body.email);
    console.log(user);
    if (user && await AuthorizationController.verify(user, req.body.password)) {
        await res.send({ token: 'token' });
    } else {
        await res.send({ error: 'USER_WITH_EMAIL_AND_PASSWORD_DOES_NOT_EXIST'});
    }
});

router.post('/register', async (req, res) => { 
    const r = await UserController.create(req.body.email, req.body.password, req.body.phone);
    await res.send({
        status: 'Working...',
    });
});

module.exports = router;
