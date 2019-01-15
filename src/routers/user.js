const express = require('express');

const auth = require('../util/auth');

const UserController = require('../controllers/UserController');
const AuthorizationController = require('../controllers/AuthorizationController');

const router = express.Router();

// crud

router.post('/token/verify', async (req, res) => {
    await res.send({ error: 'not implemented' });
});

router.post('/token', async (req, res) => {
    if (req.body.email === undefined) {
        await res.send({ errors: { email: 'This field is required' } }, 400);
        return;
    }
    const user = await UserController.retriveOneByEmail(req.body.email);
    console.log('user:');
    console.log(user);
    if (
        user &&
        (await AuthorizationController.verify(user, req.body.password))
    ) {
        console.log('hmmm...');
        await res.send({
            token: await auth.generateToken({ id: user.id }),
        });
    } else {
        await res.status(400).send({
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

router.get('/:id', async (req, res) => {
    const user = await UserController.retriveOne(req.params.id);
    if (user) {
        console.log(user);
        await res.send(user, 200);
    } else {
        await res.send({}, 400);
    }
});

module.exports = router;
