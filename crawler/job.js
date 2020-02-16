const config = require('@config');
const axios = require('axios');

class CrawlingJob extends require('node-schedule').Job {
    constructor() {
        super();
        this.count = 0;
        this.lastInvoked = null;
        this.currencyList = config.currencyList;
        this.upbitUrl = config.upbitUrl;
    }

    async execute() {
        for(let i = 0; i < this.currencyList.length; i++) {
            let currency = this.currencyList[i];
            let result = await axios.get(this.getURL(this.upbitUrl, currency));
            console.log(this.getURL(this.upbitUrl, currency));
            console.log(result.data);
        }
        this.count += 1;
        this.lastInvoked = new Date();
    }

    stat() {
        return {
            name: 'Crawling Job',
            count: this.count,
            lastInvoked: this.lastInvoked
        }
    }

    getURL(url, currency) {
        return url.replace('{period}', config.period).replace('{currency}', currency).replace('{count}', config.count);
    }
}

module.exports = new CrawlingJob();