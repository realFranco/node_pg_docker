/**
 * Dev: f97gp1@gmail.com
 * Date: June 5th, 2020
 * 
 * Enty point for this test coding session.
 */

const express = require('express');

// Importing the routes to use
const car = require('./routes/car');


const host = process.env.APP_DOMAIN;
const port = process.env.APP_PORT;

var app = express();

app.use('/car', car);

app.listen(port, () => {
    console.log('Listening at: ' + host + ':'+ port);
});

app.get('/', (req, res) => {
    return res
        .status(200)
        .send({
            result      : 'ok',
            http_code   : 200,
            msg         : 'welcome to the node_pg_docker rest api',
            version     : 'v1'
        });
});

module.exports = app;
