
const express = require('express');
const bodyParser = require('body-parser');

const db = require('./models');

db.sequelize.sync();

const app = express();

app.use(bodyParser.json());

app.use('/user', require('./routers/user')); 

app.get('/', async (req, res) => {
    await res.send({
        message: 'Welcome to the UserService. Documentation can be found at "https://github.com/elite-scrum-team/UserService"'
    })
});

const port = process.env.port | 80;

app.listen(port, () => console.log(`listening on port ${port}`));
