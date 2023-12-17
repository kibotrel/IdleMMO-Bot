import type { LogLevel } from 'discordbox'

export interface Environment {
  nodeEnv: string
  discordBotToken: string
  discordBotClientId: string
  discordBotGuildId: string
  discordBotSupportUserId: string
  logLevel: LogLevel
}
