module.exports = {
    port: 3000,
    schedule: '* */1 * * * *',
    currencyList: ['BTC', 'ETH'],
    upbitUrl: 'https://crix-api-endpoint.upbit.com/v1/crix/candles/minutes/{period}?code=CRIX.UPBIT.KRW-{currency}&count={count}',
    period: 1,  // 반복주기 (분)
    count: 1
}