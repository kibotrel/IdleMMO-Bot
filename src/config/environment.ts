import { LogLevel } from 'discordbox'
import dotenv from 'dotenv'

import type { Environment } from '../types/config.js'

dotenv.config()

export const environment: Environment = {
  nodeEnv: process.env.NODE_ENV ?? '',
  discordBotToken: process.env.DISCORD_BOT_TOKEN ?? '',
  discordBotClientId: process.env.DISCORD_BOT_CLIENT_ID ?? '',
  discordBotGuildId: process.env.DISCORD_BOT_GUILD_ID ?? '',
  discordBotSupportUserId: process.env.DISCORD_BOT_SUPPORT_USER_ID ?? '',
  logLevel:
    process.env.NODE_ENV === 'production' ? LogLevel.Error : LogLevel.Info,
}
