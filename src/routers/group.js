const express = require('express');

const GroupController = require('../controllers/GroupController');

const router = express.Router();

// create group
router.post('/', async (req, res) => {
    const group = await GroupController.create(req.body);
    if (group) {
        await res.send(group);
    } else {
        await res.status(400).send({ error: 'failed' });
    }
});


router.put('/:id', async (req, res) => {
    const group = await GroupController.update(req.body, req.params.id)
    if (group) await res.send(group)
    else await res.status(500).send({ error: 'failed to update group' })
})

// retrive groups
router.get('/', async (req, res) => {
    const groups = await GroupController.retrieve(req.query);
    if (groups) await res.send(groups);
    else await res.status(500).send({ error: 'failed to send groups' });
});

router.get('/:id', async (req, res) => {
    const group = await GroupController.retrieveOne(req.params.id)
    if (group) await res.send(group)
    else await res.status(400).send({ error: 'failed to find group' })
})

// add user/users to grup
router.post('/add', async (req, res) => {
    const result = await GroupController.addUser(
        req.body.groupId,
        req.body.userId
    );
    if (result)
        await res.send({
            status: `created connection between ${req.body.groupId} and ${
                req.body.userId
            }`,
        });
    else await res.status(400).send({ error: 'yolo' });
});

// delete user/users from group
router.post('/delete', async (req, res) => {
    const result = await GroupController.deleteUser(
        req.body.groupId,
        req.body.userId
    );
    if (result)
        await res.send({
            status: `deleted connection between ${req.body.groupId} and ${
                req.body.userId
            }`,
        });
    else await res.status(400).send({ error: 'tolo' });
});

module.exports = router;
