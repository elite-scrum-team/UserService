
const express = require('express');

const app = express();

app.get('/', async (req, res) => {
    await res.send('Hello world11');
});

const port = process.env.port | 80;

app.listen(port, () => console.log(`listening on port ${port}`));
