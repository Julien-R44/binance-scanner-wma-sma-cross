import { AlertHistory } from 'AlertHistory'
import { BinanceSymbol } from 'contracts'

export interface AlertOptions {
  sens: string
  symbol: BinanceSymbol
  ut: string
  lastCandleTime: number
  lastCandleClose: number
}

export class Alert {
  public sens: string
  public symbol: BinanceSymbol
  public ut: string
  public lastCandleTime: number
  public lastCandleClose: number

  constructor(options: AlertOptions) {
    this.sens = options.sens
    this.ut = options.ut
    this.symbol = options.symbol
    this.lastCandleTime = options.lastCandleTime
    this.lastCandleClose = options.lastCandleClose
  }

  public addToHistory(): void {
    AlertHistory.addAlert(this)
  }
}
