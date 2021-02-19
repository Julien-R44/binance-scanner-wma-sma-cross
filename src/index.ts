import { BinanceSymbol } from './contracts'
import { DiscordHook } from 'DiscordHook'
import BinanceApi from 'BinanceApi'
import { AssetScanner } from 'AssetScanner'

async function main() {
  const exchangeInfo = await BinanceApi.futuresExchangeInfo()

  const symbols: Array<BinanceSymbol> = exchangeInfo.symbols.map(
    (symbol) => new BinanceSymbol(symbol)
  )

  // const symbols = [
  //   new BinanceSymbol({
  //     symbol: 'BTCUSDT'
  //   })
  // ]

  const discordHook5m = new DiscordHook(
    '811699737299386416',
    'sLOQm0XglsgptoKAm8gU0BcT7eKOohC4-nzMRj23DFAsGMwZAmSvsMUkbQPzA3pUeqVz'
  )

  const discordHook1m = new DiscordHook(
    '811725339981119498',
    's6i-8nXPQPJ6L0_FWLz00-QKXeCyZbVawYqzCU0NMyF6V749SgoUE4AnyGDGa6zq2Jzp'
  )

  symbols.forEach(async (symbol) => {
    AssetScanner.scanAsset('1m', discordHook1m, symbol)
    AssetScanner.scanAsset('5m', discordHook5m, symbol)
  })
}

setInterval(() => {
  console.log('new scan')
  main()
}, 50000)
main()
