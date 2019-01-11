
const express = require('express');

const auth = require('../util/auth');

const UserController = require('../controllers/UserController');
const AuthorizationController = require('../controllers/AuthorizationController');

const router = express.Router();

// curd 

router.get('/', async (req, res) => {
    const payload = req.body.payload;
    if (payload.email) {
        await res.send(
            await UserController.retriveOne(payload.email));
    } else {
        await res.send({});
    }
});

router.post('/login', async (req, res) => {
    const payload = req.body.payload;
    if (payload.email === undefined) {
        await res.send({ errors: { email: 'This field is required' }});
        return;
    }
    const user = await UserController.retriveOne(payload.email);
    if (user && await AuthorizationController.verify(user, payload.password)) {
        await res.send({ token: await auth.generateToken({ email: user.email })});
    } else {
        await res.send({ error: 'USER_WITH_EMAIL_AND_PASSWORD_DOES_NOT_EXIST'});
    }
});

router.post('/register', async (req, res) => { 
    const payload = req.body.payload;
    const user = await UserController.create(payload.email, payload.password, payload.phone);
    await res.send(user);
});

module.exports = router;

