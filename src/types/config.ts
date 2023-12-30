import type { LogLevel } from 'discordbox'

export interface Environment {
  discordBotClientId: string
  discordBotGuildId: string
  discordBotSupportUserId: string
  discordBotToken: string
  logLevel: LogLevel
  nodeEnv: string
  version: string
}
