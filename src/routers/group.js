const express = require('express');

const router = express.Router();

// create group
router.post('/', async (req, res) => {
    await res.send({ status: 'group created' });
});

// retrieveOne group
router.get('/:id', async (req, res) => {});

// retrive groups
router.get('/', async (req, res) => {});

// update group
router.post('/:id', async (req, res) => {});

// add user/users to grup
router.post('/user/add', async (req, res) => {});

// delete user/users from group
router.post('/user/delete', async (req, res) => {});
