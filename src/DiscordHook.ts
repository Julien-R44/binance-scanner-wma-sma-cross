import { Alert } from './Alert'
import Discord from 'discord.js'
import { format } from 'date-fns'
import fr from 'date-fns/locale/fr'

export class DiscordHook {
  private hook: Discord.WebhookClient

  constructor(id: string, token: string) {
    this.hook = new Discord.WebhookClient(id, token)
  }

  public sendAlert(alert: Alert): void {
    this.hook.send(
      new Discord.MessageEmbed()
        .setTitle(alert.symbol.baseAsset)
        .setDescription('Croisement WMA / SMA')
        .setColor(alert.sens === 'SHORT' ? '#ED3A2E' : '#49D262')
        .setTimestamp()
        .setURL(`https://www.binance.com/fr/futures/${alert.symbol.symbol}`)
        .setThumbnail(
          `https://raw.githubusercontent.com/spothq/cryptocurrency-icons/master/32%402x/color/${alert.symbol.baseAsset.toLowerCase()}%402x.png`
        )
        .addFields(
          { name: 'Symbole', value: alert.symbol.symbol, inline: true },
          { name: 'Sens', value: alert.sens, inline: true },
          { name: 'UT', value: alert.ut, inline: true },
          {
            name: 'Bougie',
            value: this.formatCandleTime(alert.lastCandleTime),
            inline: true
          },
          {
            name: 'Prix Actuel',
            value: alert.lastCandleClose,
            inline: true
          }
        )
    )
  }

  private formatCandleTime(timestamp: number) {
    return format(timestamp, 'HH:mm', { locale: fr })
  }
}
