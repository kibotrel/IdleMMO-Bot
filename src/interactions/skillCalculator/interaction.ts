import type { CommandInteraction } from 'discord.js'
import type { InteractionHandler } from 'discordbox'

import { skillCalculatorCallback } from './callback.js'
import { skillCalculatorCommand } from './command.js'

export const skillCalculator: InteractionHandler<CommandInteraction> = {
  action: skillCalculatorCommand,
  callback: skillCalculatorCallback,
}
