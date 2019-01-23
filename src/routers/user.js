const express = require('express');

const auth = require('../util/auth');

const UserController = require('../controllers/UserController');
const AuthorizationController = require('../controllers/AuthorizationController');

const router = express.Router();

router.post('/token/verify', async (req, res) => {
    await res.send({ error: 'not implemented' });
});

router.post('/token', async (req, res) => {
    if (req.body.email === undefined) {
        await res.send({ errors: { email: 'This field is required' } }, 400);
        return;
    }
    const user = await UserController.retriveOneByEmail(req.body.email);
    if (
        user &&
        (await AuthorizationController.verify(user, req.body.password))
    ) {
        await res.send({
            token: await auth.generateToken({ id: user.id }),
        });
    } else {
        await res.status(400).send({
            error: 'USER_WITH_EMAIL_AND_PASSWORD_DOES_NOT_EXIST',
        });
    }
});

router.post('/forgotcauseimretard', async (req, res) => {
    const email = req.body.email;
    if (email) {
        const response = await UserController.resetPassword(email);
        if (response.status) {
            res.status(response.status).send({ msg: 'Somethig went wrong' });
        } else {
            await res.send({ msg: 'Password sent' });
        }
    } else {
        await res.status(400).send({ error: 'invalid' });
    }
});

router.post('/register', async (req, res) => {
    const user = await UserController.create(
        req.body.email,
        req.body.password,
        req.body.phone
    );
    if (user) await res.send(user);
    else await res.status(400).send(user);
});

router.post('/changePassword', async (req, res) => {
    if (req.query.internalUserId) {
        const response = await UserController.changePassword(
            req.body.password,
            req.query.internalUserId
        );
        if (response.status) {
            await res.status(response.status).send({ msg: 'Noe gikk galt' });
        } else {
            await res.send({ msg: 'Passordet ble byttet' });
        }
    } else {
        await res.status(400).send({ error: 'invalid' });
    }
});

// --- ADMIN ROUTES ---
// WILL NOT EXPOSE THESE IN API-SERVICE

// Get userdata by email
router.get('/data', async (req, res) => {
    console.log('EMAIL: ', req.query.email);
    const user = await UserController.retriveOneByEmail(req.query.email);
    if (user) {
        res.status(200).send(user);
    } else {
        await res.status(400).send({
            error: 'USER_WITH_EMAIL_AND_PASSWORD_DOES_NOT_EXIST',
        });
    }
});

// --- ADMIN ROUTES END ---

router.get('/:id', async (req, res) => {
    const user = await UserController.retriveOne(req.params.id);
    if (user) {
        await res.send(user);
    } else {
        await res.status(404).send({ error: 'user does not exist' });
    }
});

router.get('/', async (req, res) => {
    const user = await UserController.retrieveOneFiltered(
        req.query.internalUserId
    );
    if (user) {
        await res.send(user);
    } else {
        await res.status(400).send({ error: '.....' });
    }
});

module.exports = router;
