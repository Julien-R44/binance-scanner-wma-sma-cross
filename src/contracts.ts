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

export class Candle {
  time: number
  open: number
  high: number
  low: number
  close: number
  volume: number

  constructor(data) {
    this.time = Number(data[0])
    this.open = Number(data[1])
    this.high = Number(data[2])
    this.low = Number(data[3])
    this.close = Number(data[4])
    this.volume = Number(data[5])
  }
}
