import { AlertHistory } from 'AlertHistory'
import { BinanceSymbol } from 'contracts'

export interface AlertOptions {
  sens: string
  symbol: BinanceSymbol
  ut: string
  lastCandleTime: number
  lastCandleClose: number
  smma: number
  wma: number
  prevSmma: number
  prevWma: number
}

export class Alert {
  public sens: string
  public symbol: BinanceSymbol
  public ut: string

  public lastCandleTime: number
  public lastCandleClose: number

  public smma: number
  public wma: number
  public prevSmma: number
  public prevWma: number

  constructor(options: AlertOptions) {
    this.sens = options.sens
    this.ut = options.ut
    this.symbol = options.symbol
    this.lastCandleTime = options.lastCandleTime
    this.lastCandleClose = options.lastCandleClose

    this.smma = options.smma
    this.wma = options.wma
    this.prevSmma = options.prevSmma
    this.prevWma = options.prevWma
  }

  public addToHistory(): void {
    AlertHistory.addAlert(this)
  }
}
