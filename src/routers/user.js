const express = require('express');

const auth = require('../util/auth');

const UserController = require('../controllers/UserController');
const AuthorizationController = require('../controllers/AuthorizationController');

const router = express.Router();

// curd

router.get('/', async (req, res) => {
    if (req.body.email) {
        const user = await UserController.retriveOne(req.body.email);
        if (user) {
            await res.send(user, 200);
        }
    }
    await res.send({}, 400);
});

router.post('/token/verify', async (req, res) => {
    await res.send({ error: 'not implemented' });
});

router.post('/token/', async (req, res) => {
    if (req.body.email === undefined) {
        await res.send({ errors: { email: 'This field is required' } });
        return;
    }
    const user = await UserController.retriveOne(req.body.email);
    if (
        user &&
        (await AuthorizationController.verify(user, req.body.password))
    ) {
        await res.send({
            token: await auth.generateToken({ email: user.email }),
        });
    } else {
        await res.send({
            error: 'USER_WITH_EMAIL_AND_PASSWORD_DOES_NOT_EXIST',
        });
    }
});

router.post('/register', async (req, res) => {
    const user = await UserController.create(
        req.body.email,
        req.body.password,
        req.body.phone
    );
    await res.send(user);
});

module.exports = router;
