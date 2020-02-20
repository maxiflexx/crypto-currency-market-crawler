const constants = require('@constants');

module.exports = {
    port: 3000,
    jobList: [
        { 
            schedule: '0 */1 * * * *', 
            url: 'http://crix-api-endpoint.upbit.com/v1/crix/candles/minutes/1?code=CRIX.UPBIT.KRW-{currency}&count=1',
            jobType: constants.JOB_TYPE.PER_MINUTE
        },
        {
            schedule: '0 */10 * * * *',
            url: 'http://crix-api-endpoint.upbit.com/v1/crix/candles/minutes/10?code=CRIX.UPBIT.KRW-{currency}&count=1',
            jobType: constants.JOB_TYPE.PER_10_MINUTES
        },
        {
            schedule: '0 0 */1 * * *',
            url: 'http://crix-api-endpoint.upbit.com/v1/crix/candles/minutes/60?code=CRIX.UPBIT.KRW-{currency}&count=1',
            jobType: constants.JOB_TYPE.PER_HOUR
        },
        {
            schedule: '0 0 0 */1 * *',
            url: 'http://crix-api-endpoint.upbit.com/v1/crix/candles/days/?code=CRIX.UPBIT.KRW-{currency}&count=1',
            jobType: constants.JOB_TYPE.PER_DAY
        }
    ],
    currencyList: ['BTC', 'ETH', 'XRP', 'EOS'],
    kafkaHost: "kafka1:9092"   // For test
}