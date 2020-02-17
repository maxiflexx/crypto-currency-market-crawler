const Express = require('express');
const routes = Express.Router();

const crawler = require('@crawler');

routes.post('/start', (req, res) => {
    let result = crawler.start();
    res.status(200).json(result);
});

routes.post('/stop', (req, res) => {
    let result = crawler.stop();
    res.status(200).json(result);
});

routes.get('/stat',  (req, res) => {
    let result = crawler.stat();
    res.status(200).json(result);
});

module.exports = routes;