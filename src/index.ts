import BinanceApi from 'node-binance-api'
import Discord from 'discord.js'

const binance = new BinanceApi().options()
const discordHook = new Discord.WebhookClient(
  '811699737299386416',
  'sLOQm0XglsgptoKAm8gU0BcT7eKOohC4-nzMRj23DFAsGMwZAmSvsMUkbQPzA3pUeqVz'
)

export class BinanceSymbol {
  public symbol: string
  public pair: string
  public baseAsset: string
  public quoteAsset: string

  constructor(data) {
    this.symbol = data.symbol
    this.pair = data.pair
    this.baseAsset = data.baseAsset
    this.quoteAsset = data.quoteAsset
  }
}

class Candle {
  time: number
  open: number
  high: number
  low: number
  close: number
  volume: number

  constructor(data) {
    this.time = data[0]
    this.open = Number(data[1])
    this.high = Number(data[2])
    this.low = Number(data[3])
    this.close = Number(data[4])
    this.volume = Number(data[5])
  }
}

function computeWma(candles, length) {
  let norm = 0
  let sum = 0
  let weight
  for (let i = 0; i < length; i++) {
    weight = (length - i) * length
    norm += weight
    sum += candles[i].close * weight
  }
  return sum / norm
}

function computeSmma2(candles, length) {
  let sum = 0
  for (let i = 0; i < length; i++) {
    sum += candles[i].close
  }
  return sum / length
}

async function main() {
  const exchangeInfo = await binance.futuresExchangeInfo()

  const symbols: Array<BinanceSymbol> = exchangeInfo.symbols.map(
    (symbol) => new BinanceSymbol(symbol)
  )

  //   const symbols = [
  //     new BinanceSymbol({
  //       symbol: 'FTMUSDT'
  //     })
  //   ]

  symbols.forEach(async (symbol) => {
    let candles = await binance.futuresCandles(symbol.symbol, '5m')

    candles = candles.map((candle) => new Candle(candle)).reverse()

    const reversedCandle = candles
    const reversedCandleMinusLast = [...candles]
    reversedCandleMinusLast.shift()

    const lastWma = [
      computeWma(reversedCandleMinusLast, 144).toFixed(4),
      computeWma(reversedCandle, 144).toFixed(4)
    ]
    const lastSmma = [
      computeSmma2(reversedCandleMinusLast, 5).toFixed(4),
      computeSmma2(candles, 5).toFixed(4)
    ]

    if (lastSmma[0] <= lastWma[0] && lastSmma[1] >= lastWma[1]) {
      console.log(`found long opportunity on ${symbol.symbol}`)
      discordHook.send(`found long opportunity on ${symbol.symbol}`)
    }

    if (lastSmma[0] >= lastWma[0] && lastSmma[1] <= lastWma[1]) {
      console.log(`found short opportunity ${symbol.symbol}`)
      discordHook.send(`found short opportunity ${symbol.symbol}`)
    }
  })

  discordHook.destroy()
}

setInterval(() => {
  main()
}, 10000)
