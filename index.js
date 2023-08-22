const express = require('express');
const routes = require('./routes');
const db = require('./config/connection');

const cwd = process.cwd();

const PORT = process.env.PORT || 4444;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(routes);

db.once('open', () => {
    app.listen(PORT, () => console.log(`Now listening on port ${PORT}`));
});
