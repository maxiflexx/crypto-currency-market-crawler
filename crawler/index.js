const constants = require('@constants');
const Job = require('./job');
const config = require('@config');

class Crawler {
    constructor() {
        this.scheduler = require('node-schedule');
        this.jobList = []
        this.active = false;
        config.jobList.forEach(jobInfo => {
            this.jobList.push(new Job({ schedule: jobInfo.schedule, url: jobInfo.url, jobType: jobInfo.jobType }));
        });
    }

    start() {
        if (!this.jobList || this.jobList.length == 0) {
            throw new Error('Null Error: job list is null or undefined.');
        }

        if (!this.scheduler) {
            throw new Error('Null Error: scheduler is null or undefined.');
        }

        if (this.active) {
            return {
                status: constants.STATUS_CODE.ALREADY_RUNNING,
                message: 'scheduler is already running.'
            }
        }
        
        try {
            this.jobList.forEach(job => {
                this.scheduler.scheduleJob(job.schedule, job);
            });    
        } catch(error) {
            this.scheduler.cancelJob();
            console.log(error);
        }

        this.active = true;
        return {
            status: constants.STATUS_CODE.SUCCESS,
            message: 'scheduler is running successfully.'
        }
    }

    stop() {
        this.scheduler.cancelJob();
        this.active = false;
        
        return {
            status: constants.STATUS_CODE.SUCCESS,
            message: 'scheduler is stopped successfully.'
        }
    }

    stat() {
        return this.jobList.map(job => {
            return {
                jobType: job.jobType,
                schedule: job.schedule,
                active: this.active,
                jobInfo: job.stat()
            }
        });
    }
}

module.exports = new Crawler();