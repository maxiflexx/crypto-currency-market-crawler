require('module-alias/register');

const config = require('@config');
const router = require('@routes');
const Express = require('express');
const server = new Express();

server.use('/crawler', router);

process.on('uncaughtException', err => {
    console.log(err);
});

process.on('unhandledRejection', err => {
    console.log(err);
});

// eslint-disable-next-line no-unused-vars
server.use(function(err, req, res, next) {
    console.log(err.message);
    res.status(500).json(err);
});

server.listen(config.port, error => {
    if (error) {
        console.log(error);
    }

    console.log(`server is running on port ${config.port}`);
});