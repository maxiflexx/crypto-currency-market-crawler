const config = require('@config');
const Producer = require('./producer');
const axios = require('axios');

class CrawlingJob extends require('node-schedule').Job {
    constructor({ schedule, url, jobType }) {
        super();
        this.count = 0;
        this.lastInvoked = null;
        this.schedule = schedule;
        this.currencyList = config.currencyList;
        this.url = url;
        this.jobType = jobType;
        this.jobName = `Crawling Job (type: ${jobType})`;
        this.kafkaProducer = new Producer();
        this.init();
    }

    async init() {
        for(let i = 0; i < this.currencyList.length; i++) {
            await this.kafkaProducer.createTopic(corrency);
        }
    }

    async execute() {
        for(let i = 0; i < this.currencyList.length; i++) {
            let currency = this.currencyList[i];
            let result = await axios.get(this.getURL(currency));
            console.log(result.data);
            this.kafkaProducer.sendMessage([{ topic: currency, messages: [result.data], partition: 0 }], function (error, data) {
                if (error) {
                    console.log(error);
                } else {
                    console.log(data);
                }
            });
        }
        this.count += 1;
        this.lastInvoked = new Date();
    }

    stat() {
        return {
            name: `Crawling Job (type: ${this.jobType})`,
            schedule: this.schedule,
            count: this.count,
            lastInvoked: this.lastInvoked
        }
    }

    getURL(currency) {
        return this.url.replace('{currency}', currency);
    }
}

module.exports = CrawlingJob;