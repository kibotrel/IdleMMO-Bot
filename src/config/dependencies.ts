import { DiscordBot } from 'discordbox'

import { environment } from './environment.js'

export const bot = new DiscordBot({
  token: environment.discordBotToken,
  clientId: environment.discordBotClientId,
  guildId: environment.discordBotGuildId,
  supportUserId: environment.discordBotSupportUserId,
  logLevel: environment.logLevel,
})
