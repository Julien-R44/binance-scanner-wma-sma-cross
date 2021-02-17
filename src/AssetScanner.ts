import { Alert } from 'Alert'
import { AlertHistory } from 'AlertHistory'
import AT from 'at'
import BinanceApi from 'BinanceApi'
import { Candle, BinanceSymbol } from 'contracts'
import { DiscordHook } from 'DiscordHook'

export class AssetScanner {
  public static async scanAsset(
    ut: string,
    hook: DiscordHook,
    symbol: BinanceSymbol
  ): Promise<void> {
    let candles
    candles = await BinanceApi.futuresCandles(symbol.symbol, ut)

    try {
      candles = candles.map((candle) => new Candle(candle)).reverse()
    } catch (err) {
      console.log(candles)
      console.error(err)
    }

    const reversedCandle = candles
    const reversedCandleMinusLast = [...candles]
    reversedCandleMinusLast.shift()

    const lastWma = [
      AT.computeWma(reversedCandleMinusLast, 144),
      AT.computeWma(reversedCandle, 144)
    ]
    const lastSmma = [
      AT.computeSmma2(reversedCandleMinusLast, 5),
      AT.computeSmma2(candles, 5)
    ]

    if (lastSmma[0] <= lastWma[0] && lastSmma[1] >= lastWma[1]) {
      const message =
        `SYMBOL: ${symbol.symbol}\n` + `SENS: LONG\n` + `UT: ${ut}`
      const alert = new Alert({
        sens: 'LONG',
        symbol,
        ut,
        lastCandleTime: reversedCandle[0].time,
        lastCandleClose: reversedCandle[0].close
      })

      if (!AlertHistory.alertWasAlreadySent(alert)) {
        alert.addToHistory()
        hook.sendAlert(alert)
      } else {
        console.log('already sent long')
      }
    }

    if (lastSmma[0] >= lastWma[0] && lastSmma[1] <= lastWma[1]) {
      const message =
        `SYMBOL: ${symbol.symbol}\n` + `SENS: SHORT\n` + `UT: ${ut}`
      const alert = new Alert({
        sens: 'SHORT',
        symbol,
        ut,
        lastCandleTime: reversedCandle[0].time,
        lastCandleClose: reversedCandle[0].close
      })

      if (!AlertHistory.alertWasAlreadySent(alert)) {
        if (ut === '5m') {
          console.log(alert, AlertHistory.sentAlerts)
        }
        alert.addToHistory()
        hook.sendAlert(alert)
      } else {
        console.log('already sent short')
      }
    }
  }
}
