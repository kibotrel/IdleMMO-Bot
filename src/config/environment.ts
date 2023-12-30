import { LogLevel } from 'discordbox'
import dotenv from 'dotenv'

import manifest from '../../package.json' assert { type: 'json' }
import type { Environment } from '../types/config.js'

dotenv.config()

export const environment: Environment = {
  discordBotClientId: process.env.DISCORD_BOT_CLIENT_ID ?? '',
  discordBotGuildId: process.env.DISCORD_BOT_GUILD_ID ?? '',
  discordBotSupportUserId: process.env.DISCORD_BOT_SUPPORT_USER_ID ?? '',
  discordBotToken: process.env.DISCORD_BOT_TOKEN ?? '',
  logLevel:
    process.env.NODE_ENV === 'production' ? LogLevel.Error : LogLevel.Info,
  nodeEnv: process.env.NODE_ENV ?? '',
  version: manifest.version,
}
