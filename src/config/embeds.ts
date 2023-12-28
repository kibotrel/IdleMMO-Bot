import { EmbedBuilder } from 'discord.js'
import { EmbedColors } from 'discordbox'

import { environment } from './environment.js'

export const baseEmded = () => {
  return new EmbedBuilder()
    .setTitle('Placeholder')
    .setColor(EmbedColors.Info)
    .setDescription('Placeholder')
    .setTimestamp()
    .setFooter({
      text: `IdleMMO Bot v${environment.version}`,
    })
}
