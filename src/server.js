const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');

const client = require('prom-client');
const collectDefaultMetrics = client.collectDefaultMetrics;
collectDefaultMetrics({ timeout: 5000 });

const db = require('./models');

db.sequelize.sync({ alter: true });

const app = express();

// to parse json
app.use(bodyParser.json());
app.use(morgan('dev'));

app.use('/api/v1/user', require('./routers/user'));

app.get('/', async (req, res) => {
    await res.send({
        message:
            'Welcome to the UserService. Documentation can be found at "https://github.com/elite-scrum-team/UserService"',
    });
});

app.get('/metrics', async (req, res) => {
    await res.set('Content-Type', client.register.contentType);
    await res.end(client.register.metrics());
});

console.log(process.env.port);

const port = process.env.port || 5000;

app.listen(port, () => console.log(`listening on port ${port}`));
