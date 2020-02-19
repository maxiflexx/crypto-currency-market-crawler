const constants = require('@constants');

module.exports = {
    port: 3000,
    jobList: [
        { 
            schedule: '0 */1 * * * *', 
            url: 'https://crix-api-endpoint.upbit.com/v1/crix/candles/minutes/1?code=CRIX.UPBIT.KRW-{currency}&count=1',
            jobType: constants.JOB_TYPE.PER_MINUTE
        },
        {
            schedule: '0 */10 * * * *',
            url: 'https://crix-api-endpoint.upbit.com/v1/crix/candles/minutes/10?code=CRIX.UPBIT.KRW-{currency}&count=1',
            jobType: constants.JOB_TYPE.PER_10_MINUTES
        },
        {
            schedule: '0 0 */1 * * *',
            url: 'https://crix-api-endpoint.upbit.com/v1/crix/candles/minutes/60?code=CRIX.UPBIT.KRW-{currency}&count=1',
            jobType: constants.JOB_TYPE.PER_HOUR
        },
        {
            schedule: '0 0 0 */1 * *',
            url: 'https://crix-api-endpoint.upbit.com/v1/crix/candles/days/?code=CRIX.UPBIT.KRW-{currency}&count=1',
            jobType: constants.JOB_TYPE.PER_DAY
        }
    ],
    currencyList: ['BTC', 'ETH', 'XRP', 'EOS'],
    kafkaHost: "server.1=0.0.0.0:2888:3888;2181 server.2=zoo2:2888:3888;2181 server.3=zoo3:2888:3888;2181"
}