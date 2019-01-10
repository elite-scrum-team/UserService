
const express = require('express');

const auth = require('../util/auth');

const UserController = require('../controllers/UserController');
const AuthorizationController = require('../controllers/AuthorizationController');

const router = express.Router();

router.post('/login', async (req, res) => {
    const payload = req.body.payload;
    console.log(req.body);
    if (payload.email === undefined) {
        await res.send({ errors: { email: 'This field is required' }});
        return;
    }
    const user = await UserController.retriveOne(payload.email);
    console.log(user);
    if (user && await AuthorizationController.verify(user, payload.password)) {
        await res.send({ token: auth.generateToken({ email: user.email })});
    } else {
        await res.send({ error: 'USER_WITH_EMAIL_AND_PASSWORD_DOES_NOT_EXIST'});
    }
});

router.post('/register', async (req, res) => { 
    const payload = req.body.payload;
    const r = await UserController.create(payload.email, payload.password, payload.phone);
    await res.send({
        status: 'Working...',
    });
});

module.exports = router;
