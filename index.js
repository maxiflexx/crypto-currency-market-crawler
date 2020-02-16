require('module-alias/register');

const crawler = require('@crawler');
const config = require('@config');
const Express = require('express');
const server = new Express();

server.post('/crawler/start', (req, res) => {
    let result = crawler.start();
    res.status(200).json(result);
});

server.post('/crawler/stop', (req, res) => {
    let result = crawler.stop();
    res.status(200).json(result);
});

server.get('/crawler/stat',  (req, res) => {
    let result = crawler.stat();
    res.status(200).json(result);
});

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