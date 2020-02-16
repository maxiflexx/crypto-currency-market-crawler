const constants = require('@constants');
const config = require('@config');

class Crawler {
    constructor() {
        this.scheduler = require('node-schedule');
        this.schedule = config.schedule;
        this.job = require('./job');
        this.active = false;
    }

    start() {
        if (!this.job) {
            throw new Error('Null Error: job is null or undefined.');
        }

        if (!this.scheduler) {
            throw new Error('Null Error: scheduler is null or undefined.');
        }

        if (this.active) {
            return {
                status: constants.STATUS_CODE.ALREADY_RUNNING,
                message: 'Scheduler is already running.'
            }
        }

        this.scheduler.scheduleJob(this.schedule, this.job);
        this.active = true;
        return {
            status: constants.STATUS_CODE.SUCCESS,
            message: 'Scheduler is running successfully.'
        }
    }

    stop() {
        this.scheduler.cancelJob();
        this.active = false;
        
        return {
            status: constants.STATUS_CODE.SUCCESS,
            message: 'Scheduler is running successfully.'
        }
    }

    stat() {
        return {
            schedule: this.schedule,
            active: this.isActive,
            jobInfo: this.job.stat()
        }
    }
}

module.exports = new Crawler();